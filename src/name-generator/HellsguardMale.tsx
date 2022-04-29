import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Section from '../Section'
import NameAutocomplete from './NameAutocomplete'
import MyNameIs from './MyNameIs'
import { charaMakeNames } from './ffxiv-name-generator/data'
import { translate, Clan, Gender } from './ffxiv-name-generator'
import { formatName } from './ffxiv-name-generator/src/utils'

const HellsguardMale = (): React.ReactElement => {
  const { t, i18n } = useTranslation('name-generator')
  const [forename, setForename] = useState('')
  const [surname, setSurname] = useState('')
  const name = formatName(forename, surname)
  const locale = i18n.language

  return (
    <Section title={`${translate('clan', Clan.Hellsguard, locale)} (${translate('gender', Gender.Male, locale)})`}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <NameAutocomplete
            options={charaMakeNames.roegadyn_hellsguard_firstName}
            value={forename}
            onChange={setForename}
            label={t('forename')}
            placeholder={t('enterForename')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Hellsguard names are formed from two words translated to modern Eorzean, typically a descriptor and a noun. They tend to draw heavily from nature, whether it’s a vegetable, an animal, animate, inanimate, abstract, or concrete.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <NameAutocomplete
            options={charaMakeNames.roegadyn_hellsguard_male_lastName}
            value={surname}
            onChange={setSurname}
            label={t('surname')}
            placeholder={t('enterSurname')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Highly independent in nature, Hellsguard who leave their mountain homes for the city-states of Eorzea will often drop their family names.
          </Typography>
        </Grid>
        {name.length > 0 && (
          <Grid item xs={12}>
            <MyNameIs name={name} />
          </Grid>
        )}
      </Grid>
    </Section>
  )
}

export default HellsguardMale
