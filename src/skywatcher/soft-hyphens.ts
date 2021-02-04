const SHY = '\u00AD'

// Not sure of any better way yet
// Split all words that are >= 10 letters
const WITH_HYPHENS: Record<string, string> = {
  Thunderstorms: `Thunder${SHY}storms`,
  Sandstorms: `Sand${SHY}storms`,
  Hyperelectricity: `Hyper${SHY}elec${SHY}tricity`,
  Oppression: `Oppres${SHY}sion`,
  Multiplicity: `Multi${SHY}plicity`,
  Dragonstorms: `Dragon${SHY}storms`,
  Subterrain: `Sub${SHY}terrain`,
  Concordance: `Concord${SHY}ance`,
  Wyrmstorms: `Wyrm${SHY}storms`,
  Revelstorms: `Revel${SHY}storms`,
  Quicklevin: `Quick${SHY}levin`,
  'Dimensional Disruption': `Dimen${SHY}sional Disrup${SHY}tion`,
  'Umbral Turbulence': `Umbral Turbu${SHY}lence`,
  Brilliance: `Bril${SHY}liance`,
  'Everlasting Light': `Ever${SHY}lasting Light`,
  Termination: `Termi${SHY}nation`,
  Irradiance: `Irradi${SHY}ance`,
  Wolkenbruch: `Wolken${SHY}bruch`,
  Schneesturm: `Schnee${SHY}sturm`,
  Unheimlich: `Unheim${SHY}lich`,
  Kernstrahlung: `Kern${SHY}strah${SHY}lung`,
  Wolkenschleier: `Wolken${SHY}schleier`,
  Bedrückend: `Bedrü${SHY}ckend`,
  Schattenwind: `Schatten${SHY}wind`,
  Schattengewitter: `Schatten${SHY}gewitter`,
  Hochspannung: `Hoch${SHY}span${SHY}nung`,
  Königsgewitter: `Königs${SHY}gewitter`,
  Regnerisch: `Regne${SHY}risch`,
  Unterirdisch: `Unter${SHY}irdisch`,
  Gerechtigkeit: `Gerech${SHY}tigkeit`,
  Drachensturm: `Drachen${SHY}sturm`,
  Feiersturm: `Feier${SHY}sturm`,
  Blitzsturm: `Blitz${SHY}sturm`,
  Dimensionsspaltend: `Dimen${SHY}sions${SHY}spal${SHY}tend`,
  Rotlodernd: `Rotlo${SHY}dernd`,
  'Astrale Turbulenzen': `Astrale Turbu${SHY}len${SHY}zen`,
  Blauschimmernd: `Blau${SHY}schim${SHY}mernd`,
  Feenträume: `Feen${SHY}träume`,
  'Strahlende Glanzhaftigkeit': `Strah${SHY}lende Glan${SHY}zhaf${SHY}tig${SHY}keit`,
  Rauchschwaden: `Rauch${SHY}schwaden`,
  Apokalyptisch: `Apo${SHY}kalyp${SHY}tisch`,
  Feuerseelenwinde: `Feuer${SHY}seelen${SHY}winde`,
  Erdseelenwinde: `Erd${SHY}seelen${SHY}winde`,
  Donnerseelenwinde: `Donner${SHY}seelen${SHY}winde`,
  Sturmseelenwinde: `Sturm${SHY}seelen${SHY}winde`,
  Wetterleuchten: `Wetter${SHY}leuch${SHY}ten`,
  Flammensturm: `Flammen${SHY}sturm`,
  Phantomströmung: `Phantom${SHY}strömung`,
  Brouillard: `Brouil${SHY}lard`,
  'Pluie torrentielle': `Pluie torren${SHY}tielle`,
  Désespérance: `Déses${SHY}pérance`,
  'Radiations du Cœur': `Radia${SHY}tions du Cœur`,
  Hyperélectricité: `Hyper${SHY}électri${SHY}cité`,
  // Oppression: `Oppression`,
  Multiplicité: `Multi${SHY}pli${SHY}cité`,
  Souterrain: `Sou${SHY}ter${SHY}rain`,
  'Infini démoniaque': `Infini démo${SHY}niaque`,
  'Tempête draconique': `Tempête draco${SHY}nique`,
  'Perturbation dimensionnelle': `Pertur${SHY}bation dimen${SHY}sion${SHY}nelle`,
  Fantasmagorique: `Fantas${SHY}mago${SHY}rique`,
  'Turbulences ombrales': `Turbu${SHY}lences ombrales`,
  Apocalypse: `Apoca${SHY}lypse`,
  Rayonnement: `Rayon${SHY}nement`
}

export default function softHyphens (str: string): string {
  return WITH_HYPHENS[str] !== undefined ? WITH_HYPHENS[str] : str
}
