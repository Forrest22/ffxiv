import React, { useEffect, useState } from 'react'
import Section from '../Section'
import Grid from '@mui/material/Grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import RouteInformationIntuition from './RouteInformationIntuition'
import RouteInformationTimeSensitive from './RouteInformationTimeSensitive'
import RouteInformationPoints from './RouteInformationPoints'
import RouteInformationAll from './RouteInformationAll'
import { calculateVoyages, getStopTimes, Dest, Time, DestTime } from './ffxiv-ocean-fishing'
import * as maps from './maps'
import { timeUntil, upperFirst } from './utils'
import translate from '../translate'
import { useTranslation } from '../i18n'

// const useStyles = makeStyles(theme => ({
//   headerSub: {
//     marginLeft: theme.spacing(2),
//     [theme.breakpoints.down('md')]: {
//       marginLeft: 0,
//       display: 'block'
//     }
//   },
//   headerTime: {
//     position: 'relative',
//     top: '-0.2em',
//     marginLeft: '0.25em'
//   },
//   fishFilterSelect: {
//     display: 'block',
//     [theme.breakpoints.up('md')]: {
//       textAlign: 'right'
//     }
//   },
//   fishTab: {
//     textTransform: 'none'
//   }
// }))

enum FishFilter {
  Intuition = 'intuition',
  TimeSensitive = 'time-sensitive',
  Points = 'points',
  All = 'all'
}

interface Props {
  now: Date
  route: DestTime
}

const RouteInformation = ({ now, route }: Props): React.ReactElement => {
  const { t, i18n } = useTranslation('ocean-fishing')
  const [fishFilter, setFishFilter] = useState<FishFilter | null>(null)
  const stopTimes = getStopTimes(route)
  const next = calculateVoyages(now, 1, [route])[0].date
  const locale = i18n.language

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = window.localStorage.getItem('ocean-fishing/route-information-filter')
      if (data !== null) {
        const key = Object.keys(FishFilter).find(key => FishFilter[key] === data)
        setFishFilter(key !== undefined ? FishFilter[key] : FishFilter.Intuition)
      }
    }
  }, [])
  useEffect(() => {
    if (fishFilter !== null) {
      window.localStorage.setItem('ocean-fishing/route-information-filter', fishFilter)
    }
  }, [fishFilter])

  const handleSelectFishFilter = (event: SelectChangeEvent<{ value: FishFilter }>): void => {
    setFishFilter(event.target.value)
  }

  return (
    <Section
      title={
        <Grid container alignItems='flex-end'>
          <Grid item xs={12} md={8}>
            {upperFirst(translate(locale, maps.STOP_MAP[route[0] as Dest].placeName_sub, 'name_noArticle', 'name'))}
            <span className={'classes.headerTime'}>{maps.TIME_MAP[route[1] as Time]}</span>
            <Typography display='inline' className={'classes.headerSub'}>
              {timeUntil(now, next, { t, full: true, locale })}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={'classes.fishFilterSelect'}>
              <Select value={fishFilter ?? FishFilter.Intuition} onChange={handleSelectFishFilter}>
                <MenuItem value={FishFilter.Intuition}>{t('showIntuitionFish')}</MenuItem>
                <MenuItem value={FishFilter.TimeSensitive}>{t('showTimeFish')}</MenuItem>
                <MenuItem value={FishFilter.Points}>{t('showPointsFish')}</MenuItem>
                <MenuItem value={FishFilter.All}>{t('showAllFish')}</MenuItem>
              </Select>
            </div>
          </Grid>
        </Grid>
      }
    >
      {(() => {
        switch (fishFilter ?? FishFilter.Intuition) {
          case FishFilter.Intuition:
            return <RouteInformationIntuition stopTimes={stopTimes} />
          case FishFilter.TimeSensitive:
            return <RouteInformationTimeSensitive stopTimes={stopTimes} />
          case FishFilter.Points:
            return <RouteInformationPoints stopTimes={stopTimes} />
          case FishFilter.All:
            return <RouteInformationAll stopTimes={stopTimes} />
        }
      })()}
    </Section>
  )
}

export default RouteInformation
