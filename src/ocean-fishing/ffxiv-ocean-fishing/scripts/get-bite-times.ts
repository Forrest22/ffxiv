import fs from 'fs'
import path from 'path'
import oceanFishingFishingSpots from '../data/fishing-spots.json'
import oceanFishingFishes from '../data/fishes.json'
import oceanFishingBaits from '../data/baits.json'

const CUTOFF = 0.02
const OUTPUT = path.resolve(__dirname, '../data/bite-times.json')

const BAIT_IDS = [
  ...Object.keys(oceanFishingBaits).map(Number),
  29722, // Ghoul Barracuda
  29761, // Hi-aetherlouse
  29718, // Tossed Dagger
  32107 // Rothlyt Mussel
]

let DATA = []
for (const fishingSpot of Object.keys(oceanFishingFishingSpots)) {
  DATA.push(...require(`../data/tc/spot-${fishingSpot}.json`))
}

function getBiteTime (fishId: number, baitId: number) {
  const times = DATA
    .filter(datum => datum.itemId === fishId && (!baitId || datum.baitId === baitId))
    .sort((a, b) => a.biteTime - b.biteTime)
  const totalOccurrences = times.reduce((acc, curr) => acc + curr.occurrences, 0)

  if (totalOccurrences < 10) {
    // Too few reports for meaningful data
    return null
  } else {
    const cutOff = Math.floor(totalOccurrences * CUTOFF)
    let minTime: number, maxTime: number
    for (let count = 0, index = 0; index < times.length; ++index) {
      count += times[index].occurrences
      if (minTime === undefined && count >= cutOff) {
        minTime = times[index].biteTime
      }
      if (maxTime === undefined && count >= totalOccurrences - cutOff) {
        maxTime = times[index].biteTime
      }
    }
    return [minTime, maxTime]
  }
}

const biteTimes = {}
for (const fish of Object.values(oceanFishingFishes)) {
  const biteTimesByBait = {}
  let minBiteTime: number, maxBiteTime: number
  BAIT_IDS.forEach(baitId => {
    const biteTime = getBiteTime(fish.id, baitId)
    if (biteTime) {
      if (baitId !== 29717) { // Ignore Versatile Lure
        minBiteTime = minBiteTime ? Math.min(minBiteTime, biteTime[0]) : biteTime[0]
        maxBiteTime = maxBiteTime ? Math.max(maxBiteTime, biteTime[1]) : biteTime[1]
      }
      biteTimesByBait[baitId] = biteTime
    }
  })
  biteTimes[fish.id] = {
    all: (minBiteTime && maxBiteTime && [minBiteTime, maxBiteTime]) || null,
    ...biteTimesByBait
  }
}

fs.writeFileSync(OUTPUT, JSON.stringify(biteTimes))

//
// Create CSV
//

import csvStringify from 'csv-stringify/lib/sync'

const CSV_OUTPUT = path.resolve(__dirname, '../data/bite-times.csv')

function _getBiteTime (fishId: number, baitId: number) {
  return biteTimes[fishId]
    && biteTimes[fishId][baitId]
    && biteTimes[fishId][baitId].join('-')
    || undefined
}

const csv = csvStringify(
  Object.values(oceanFishingFishes)
    .map(fish => Object.values(oceanFishingBaits).reduce(
      (acc, bait) => (acc[bait.name_en] = _getBiteTime(fish.id, bait.id), acc),
      { name: fish.name_en }
    )),
  {
    header: true,
    columns: ['name', ...Object.values(oceanFishingBaits).map(bait => bait.name_en)]
  }
)
fs.writeFileSync(CSV_OUTPUT, csv)