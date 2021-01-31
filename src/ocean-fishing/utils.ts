import { timeUntil as genericTimeUntil } from '../utils'
import { fishingSpots, fishes } from './ffxiv-ocean-fishing/data'
import { getStops, Time, DestinationStopTime } from './ffxiv-ocean-fishing'
import { Bait as BaitChainProp } from './BaitChain'
import * as maps from './maps'
import { TFunction } from 'next-i18next'

function memoize<T, R> (func: (arg: T) => R): (arg: T) => R {
  const cache: { [key: string]: R } = {}
  return (arg: T) => {
    const key = String(arg)
    return cache[key] !== undefined ? cache[key] : (cache[key] = func(arg))
  }
}

export function timeUntil (now: Date, then: Date, options: { t: TFunction, full?: boolean, locale?: string }) {
  const diff = then.getTime() - now.getTime()
  if (diff < -900000) {
    return options.t('routeInfo.enRoute')
  } else if (diff < 0) {
    return options.t('routeInfo.boardingNow')
  } else {
    return genericTimeUntil(now, then, { full: options.full, locale: options.locale })
  }
}

export function getBlueFish (destinationCode: DestinationStopTime): number[] {
  const stopTimes = getStops(destinationCode)
  return stopTimes
    .map(destinationStopTime => maps.BLUE_FISH_MAP[destinationStopTime[0]])
    .map((fishId, index) => {
      const time: Time = <any>stopTimes[index][1]
      const spreadsheetData = fishes[fishId].spreadsheetData
      return spreadsheetData.time && spreadsheetData.time.includes(time) ? fishId : null
    })
}

export function isBaitRequired (fishId: number, baitId: number) {
  for (const otherBaitId of Object.keys(fishes[fishId].biteTimes)) {
    if (otherBaitId === 'all' || Number(otherBaitId) === baitId || Number(otherBaitId) === 29717) {
      continue
    } else {
      return false
    }
  }
  return true
}

export const getBaitChain = memoize(function _getBaitChain (fishId: number): BaitChainProp[] {
  const spreadsheetData = fishes[fishId].spreadsheetData
  if (!spreadsheetData.bait && !spreadsheetData.mooch) {
    return [{ id: 29717 }, { id: fishId, tug: spreadsheetData.tug }] // Versatile Lure as fallback
  } else {
    return spreadsheetData.bait
      ? [{ id: spreadsheetData.bait }, { id: fishId, tug: spreadsheetData.tug }]
      : [..._getBaitChain(spreadsheetData.mooch), { id: fishId, tug: spreadsheetData.tug }]
  }
})

export const getBaitGroup = memoize(
  (fishId: number): { baits: BaitChainProp[], baitIsRequired?: boolean, intuitionFishes?: { baits: BaitChainProp[], baitIsRequired?: boolean, count: number }[] } => {
    const spreadsheetData = fishes[fishId].spreadsheetData
    const baitChain = getBaitChain(fishId)
    return {
      baits: baitChain,
      baitIsRequired: isBaitRequired(fishId, baitChain[0].id),
      intuitionFishes: spreadsheetData.intuition && spreadsheetData.intuition.map(({ fishId, count }) => {
        const baitChain = getBaitChain(fishId)
        return {
          baits: baitChain,
          baitIsRequired: isBaitRequired(fishId, baitChain[0].id),
          count
        }
      })
    }
  }
)

export function subtextDH (fishId: number) {
  const doubleHook = fishes[fishId].spreadsheetData.doubleHook
  return doubleHook ? `DH: ${Array.isArray(doubleHook) ? doubleHook.join('-') : doubleHook}` : 'DH: ?'
}

export function subtextBiteTime (fishId: number) {
  const biteTimeAll = fishes[fishId].biteTimes.all
  return biteTimeAll ? `${biteTimeAll[0] === biteTimeAll[1] ? biteTimeAll[0] : biteTimeAll.join('-')}s` : '?s'
}

export function upperFirst (str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

export function getBlindDHRanges (fishId: number, baitId: number, time: Time) {
  const spreadsheetData = fishes[fishId].spreadsheetData
  if (time && spreadsheetData.time && spreadsheetData.time.indexOf(time) === -1) return null
  if (!fishes[fishId].biteTimes[baitId]) return null

  const blindDHRanges = [fishes[fishId].biteTimes[baitId]]
  const fishingSpot = Object.values(fishingSpots).find(fishingSpot => fishingSpot.fishes.includes(fishId))
  for (const otherFishId of fishingSpot.fishes) {
    if (otherFishId === fishId) continue
    const otherSpreadsheetData = fishes[otherFishId].spreadsheetData

    if (otherSpreadsheetData.tug !== spreadsheetData.tug) continue
    if (time && otherSpreadsheetData.time && otherSpreadsheetData.time.indexOf(time) === -1) continue
    if (!fishes[otherFishId].biteTimes[baitId]) continue
    const otherRange = fishes[otherFishId].biteTimes[baitId]

    for (let i = 0; i < blindDHRanges.length;) {
      const currentRange = blindDHRanges[i]
      if (otherRange[1] < currentRange[0] || otherRange[0] > currentRange[1]) {
        // No overlap
        ++i
      } else if (otherRange[0] <= currentRange[0] && otherRange[1] >= currentRange[1]) {
        // Full overlap
        blindDHRanges.splice(i, 1)
      } else if (otherRange[0] > currentRange[0] && otherRange[1] < currentRange[1]) {
        // Splits currentRange into 2
        blindDHRanges.splice(i, 1, [currentRange[0], otherRange[0] - 1], [otherRange[1] + 1, currentRange[1]])
        i += 2
      } else {
        // Partial overlap
        if (currentRange[0] < otherRange[0] && otherRange[0] < currentRange[1]) {
          blindDHRanges.splice(i++, 1, [currentRange[0], otherRange[0] - 1])
        } else if (currentRange[0] < otherRange[1] && otherRange[1] < currentRange[1]) {
          blindDHRanges.splice(i++, 1, [otherRange[1] + 1, currentRange[1]])
        } else {
          console.error('This should never happen')
          i++
        }
      }
    }
  }

  return blindDHRanges
}
