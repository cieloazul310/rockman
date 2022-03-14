export type Artist = {
  name: string;
  kana: string | null;
  sortName: string;
  image: string | null;
  nation: string;
  program: Program[];
  tunes: Tune[];
  programCount: number;
  tunesCount: number;
  relatedArtists: Artist[];
  slug: string;
};

export type Program = {
  week: number;
  year: number;
  title: string;
  subtitle: string | null;
  guests: string[] | null;
  categories: string[];
  date: string;
  playlist: Tune[];
};

export type Tune = {
  id: string;
  index: number;
  indexInWeek: number;
  week: number;
  title: string;
  artist: string;
  kana: string | null;
  year: number;
  nation: string;
  label: string | null;
  corner: string | null;
  youtube: string | null;
  selector: string;
};

export type TuneBrowser = Omit<Tune, 'artist'> & {
  artist: Artist;
  program: Program;
};

export type SpitzAlbum = {
  id: string;
  albumIdNum: number;
  year: number;
  title: string;
  tunes: SpitzTune[];
};
export type SpitzAlbumBrowser = Omit<SpitzAlbum, 'tunes'> & {
  tunes: SpitzTuneBrowser[];
};

export type SpitzTune = {
  id: string;
  index: number;
  title: string;
};
export type SpitzTuneBrowser = SpitzTune & {
  append: ProgramBrowser[];
};
