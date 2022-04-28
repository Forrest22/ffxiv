import React from 'react'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AchievementInformation from './AchievementInformation'
import StopCardsContainer from './StopCardsContainer'
import StopCard from './StopCard'
import BaitList from './BaitList'
import Tug from './Tug'
import { getStopTimes, DestTime } from './ffxiv-ocean-fishing'
import { fishes } from './ffxiv-ocean-fishing/data'
import { getBaitGroup, subtextDH } from './utils'

interface Props {
  route: DestTime
}

const AchievementSharks = ({ route }: Props): React.ReactElement => {
  const stopTimes = getStopTimes(route)

  return (
    <AchievementInformation achievement={2564}>
      <StopCardsContainer>
        <StopCard index={0} stopTime={stopTimes[0]}>
          <CardContent>
            <BaitList
              baitGroups={[{
                header: 'IC; DH–IC–DH post-spectral',
                baitGroupProps: { ...getBaitGroup(fishes[28942]), subtext: subtextDH }
              }, {
                header: 'IC–DH',
                baitGroupProps: { ...getBaitGroup(fishes[29750]), subtext: subtextDH }
              }, {
                header: 'No buffs',
                baitGroupProps: { ...getBaitGroup(fishes[29751]), subtext: subtextDH }
              }, {
                header: 'DH–IC–DH',
                baitGroupProps: { ...getBaitGroup(fishes[29782]), subtext: subtextDH }
              }]}
            />
          </CardContent>
          <CardContent>
            <Typography variant='overline'>Pre-spectral</Typography>
            <Typography paragraph>
              Save GP when possible; IC if capped.
            </Typography>
            <Typography variant='overline'>Spectral</Typography>
            <Typography paragraph>
              Hook <Tug strength={2} /> and <Tug strength={3} />. IC–DH if you catch a Ghost Shark; <Tug strength={3} /> is a blind DH–IC–DH.
            </Typography>
            <Typography variant='overline'>Post-spectral</Typography>
            <Typography paragraph>
              Spend all remaining GP with blind DH–IC–DH Tarnished Sharks.
            </Typography>
          </CardContent>
        </StopCard>
        <StopCard index={1} stopTime={stopTimes[1]}>
          <CardContent>
            <Typography paragraph>
              No sharks here. Collect some Angler’s Art!
            </Typography>
            <Typography paragraph>
              Try for Coral Manta?
            </Typography>
            <Typography paragraph>
              You may opt for no spectral here for an extended one in the next zone.
            </Typography>
          </CardContent>
        </StopCard>
        <StopCard index={2} stopTime={stopTimes[2]}>
          <CardContent>
            <BaitList
              baitGroups={[{
                header: 'IC–DH; DH–IC–DH post-spectral',
                baitGroupProps: { ...getBaitGroup(fishes[29735]), subtext: subtextDH }
              }, {
                header: 'No buffs',
                baitGroupProps: { ...getBaitGroup(fishes[29767]), subtext: subtextDH }
              }, {
                header: 'DH–IC–DH',
                baitGroupProps: { ...getBaitGroup(fishes[29770]), subtext: subtextDH }
              }]}
            />
          </CardContent>
          <CardContent>
            <Typography variant='overline'>Pre-spectral</Typography>
            <Typography paragraph>
              Can blind DH Chrome Hammerheads at &lt;20s.
            </Typography>
            <Typography variant='overline'>Spectral</Typography>
            <Typography paragraph>
              Hook <Tug strength={2} /> and <Tug strength={3} />. If you catch a Sweeper, can use IC if high on GP. <Tug strength={3} /> is a blind DH.
            </Typography>
            <Typography variant='overline'>Post-spectral</Typography>
            <Typography paragraph>
              Can blind DH Chrome Hammerheads.
            </Typography>
          </CardContent>
        </StopCard>
      </StopCardsContainer>
    </AchievementInformation>
  )
}

export default AchievementSharks
