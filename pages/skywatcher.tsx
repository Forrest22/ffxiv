import React, { useEffect, useState } from 'react'
import NoSsr from '@mui/material/NoSsr'
import Typography from '@mui/material/Typography'
import Page from '../src/Page'
import Section from '../src/Section'
import UpcomingWeather from '../src/skywatcher/UpcomingWeather'
import Forecaster from '../src/skywatcher/Forecaster'
import Algorithm from '../src/skywatcher/Algorithm'
import { formatTimeUtc } from '../src/utils'
import { useTranslation } from '../src/i18n'

const Skywatcher = (): React.ReactElement => {
  const { t } = useTranslation('skywatcher')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    let interval: NodeJS.Timeout
    ;(function loop () {
      const now = new Date()
      setNow(now)
      interval = setTimeout(() => {
        interval = setTimeout(loop, (60000 - (now.getTime() * 1440 / 70) % 60000) / (1440 / 70))
      }, 0)
    })()

    return () => {
      clearTimeout(interval)
    }
  }, [])

  return (
    <Page title={t('_title')} description={t('_description')}>
      <Section>
        <Typography paragraph>
          The time in Eorzea is <b><NoSsr>{formatTimeUtc(new Date(now.getTime() * (1440 / 70)))}</NoSsr></b>.
        </Typography>
        <ul>
          <Typography component='li'>
            Some places have multiple possible weather rates depending on certain conditions. For example, Amh Araeng will always be Everlasting Light until a certain point in the MSQ.
          </Typography>
          <Typography component='li'>
            Certain special weathers such as Tension will replace the predicted weather depending on certain conditions.
          </Typography>
          <Typography component='li'>
            The weathers associated with The <em>Endeavor</em> have no apparent correlation with the weathers experienced during the voyage.
          </Typography>
        </ul>
      </Section>
      <Forecaster now={now} />
      <UpcomingWeather now={now} />
      <Algorithm />
    </Page>
  )
}

Skywatcher.getInitialProps = async () => ({
  namespacesRequired: ['common', 'skywatcher']
})

export default Skywatcher
