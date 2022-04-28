import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Section from '../Section'
import MyNameIs from './MyNameIs'
import MidlanderMale from './MidlanderMale'
import MidlanderFemale from './MidlanderFemale'
import HighlanderMale from './HighlanderMale'
import HighlanderFemale from './HighlanderFemale'
import WildwoodMale from './WildwoodMale'
import WildwoodFemale from './WildwoodFemale'
import DuskwightMale from './DuskwightMale'
import DuskwightFemale from './DuskwightFemale'
import PlainsfolkMale from './PlainsfolkMale'
import PlainsfolkFemale from './PlainsfolkFemale'
import DunesfolkMale from './DunesfolkMale'
import DunesfolkFemale from './DunesfolkFemale'
import SeekerOfTheSunMale from './SeekerOfTheSunMale'
import SeekerOfTheSunFemale from './SeekerOfTheSunFemale'
import KeeperOfTheMoonMale from './KeeperOfTheMoonMale'
import KeeperOfTheMoonFemale from './KeeperOfTheMoonFemale'
import SeaWolfMale from './SeaWolfMale'
import SeaWolfFemale from './SeaWolfFemale'
import HellsguardMale from './HellsguardMale'
import HellsguardFemale from './HellsguardFemale'
import {
  generate,
  getRaces,
  getClans,
  getGenders,
  translate,
  Race,
  Clan,
  Gender
} from './ffxiv-name-generator'
import { useTranslation } from '../i18n'

const ADVANCED: { [key: string]: React.FunctionComponent<{}> } = {
  [`${Clan.Midlander},${Gender.Male}`]: MidlanderMale,
  [`${Clan.Midlander},${Gender.Female}`]: MidlanderFemale,
  [`${Clan.Highlander},${Gender.Male}`]: HighlanderMale,
  [`${Clan.Highlander},${Gender.Female}`]: HighlanderFemale,
  [`${Clan.Wildwood},${Gender.Male}`]: WildwoodMale,
  [`${Clan.Wildwood},${Gender.Female}`]: WildwoodFemale,
  [`${Clan.Duskwight},${Gender.Male}`]: DuskwightMale,
  [`${Clan.Duskwight},${Gender.Female}`]: DuskwightFemale,
  [`${Clan.Plainsfolk},${Gender.Male}`]: PlainsfolkMale,
  [`${Clan.Plainsfolk},${Gender.Female}`]: PlainsfolkFemale,
  [`${Clan.Dunesfolk},${Gender.Male}`]: DunesfolkMale,
  [`${Clan.Dunesfolk},${Gender.Female}`]: DunesfolkFemale,
  [`${Clan.SeekerOfTheSun},${Gender.Male}`]: SeekerOfTheSunMale,
  [`${Clan.SeekerOfTheSun},${Gender.Female}`]: SeekerOfTheSunFemale,
  [`${Clan.KeeperOfTheMoon},${Gender.Male}`]: KeeperOfTheMoonMale,
  [`${Clan.KeeperOfTheMoon},${Gender.Female}`]: KeeperOfTheMoonFemale,
  [`${Clan.SeaWolf},${Gender.Male}`]: SeaWolfMale,
  [`${Clan.SeaWolf},${Gender.Female}`]: SeaWolfFemale,
  [`${Clan.Hellsguard},${Gender.Male}`]: HellsguardMale,
  [`${Clan.Hellsguard},${Gender.Female}`]: HellsguardFemale
}

function randomElement<T> (array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

const Generator = (): React.ReactElement => {
  const { t, i18n } = useTranslation('name-generator')
  const [race, setRace] = useState<Race | null>(null)
  const [clan, setClan] = useState<Clan | null>(null)
  const [gender, setGender] = useState<Gender | null>(null)
  const [results, setResults] = useState<string[] | null>(null)
  const locale = i18n.language

  const raceClans = race !== null ? getClans(race) : []
  const raceGenders = race !== null ? getGenders(race) : []
  const AdvancedComponent = (clan !== null && gender !== null) ? ADVANCED[`${clan},${gender}`] : null

  const handleSelectRace = (event: SelectChangeEvent): void => {
    const race = event.target.value === 'none' ? null : event.target.value as Race
    const raceClans = race !== null ? getClans(race) : []
    const raceGenders = race !== null ? getGenders(race) : []
    setRace(race)
    setClan(race !== null && raceClans.length === 1 ? raceClans[0] : null)
    setGender(race !== null && raceGenders.length === 1 ? raceGenders[0] : null)
  }
  const handleSelectClan = (event: SelectChangeEvent): void => {
    const clan = event.target.value
    setClan(clan === 'none' ? null : clan as Clan)
  }
  const handleSelectGender = (event: SelectChangeEvent): void => {
    const gender = event.target.value
    setGender(gender === 'none' ? null : gender as Gender)
  }

  const handleClickGenerate = (): void => {
    const newResults: string[] = []
    for (let i = 0; i < 10; ++i) {
      const genRace = race !== null ? race : randomElement(getRaces())
      const genClan = clan !== null ? clan : randomElement(getClans(genRace))
      const genGender = gender !== null ? gender : randomElement(getGenders(genRace))
      newResults.push(generate(genClan, genGender))
    }
    setResults(newResults)
  }

  return (
    <>
      <Section>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl variant='standard' fullWidth>
              <InputLabel>{t('race')}</InputLabel>
              <Select value={race !== null ? race : 'none'} onChange={handleSelectRace}>
                <MenuItem value='none'>{t('anyRace')}</MenuItem>
                {getRaces().map(race =>
                  <MenuItem key={race} value={race}>{translate('race', race, locale)}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant='standard' fullWidth>
              <InputLabel>{t('clan')}</InputLabel>
              <Select value={clan !== null ? clan : 'none'} onChange={handleSelectClan}>
                {raceClans.length !== 1 && <MenuItem value='none'>{t('anyClan')}</MenuItem>}
                {raceClans.map(clan =>
                  <MenuItem key={clan} value={clan}>
                    {translate('clan', clan, locale)}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant='standard' fullWidth>
              <InputLabel>{t('gender')}</InputLabel>
              <Select value={gender !== null ? gender : 'none'} onChange={handleSelectGender}>
                {raceGenders.length !== 1 && <MenuItem value='none'>{t('anyGender')}</MenuItem>}
                {raceGenders.map(gender =>
                  <MenuItem key={gender} value={gender}>
                    {translate('gender', gender, locale)}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' color='primary' fullWidth onClick={handleClickGenerate}>{t('generate')}</Button>
          </Grid>
        </Grid>
        <MyNameIs name={results ?? 'Click the Generate button!'} />
      </Section>
      {AdvancedComponent != null && <AdvancedComponent />}
    </>
  )
}

export default Generator
