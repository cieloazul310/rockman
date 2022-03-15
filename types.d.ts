export type Artist = {
  name: string;
  kana: string | null;
  sortName: string;
  nation: string;
  slug: string;
};

export type ArtistBrowser = Artist & {
  program: {
    programs: Program[];
    programsCount: number;
    tunes: Tune[];
    tunesCount: number;
    image: string | null;
    relatedArtists: ArtistBrowser[];
  };
};

export type Program = {
  week: number;
  year: number;
  date: string;
  slug: string;
  title: string;
  subtitle: string | null;
  image: string | null;
  guests: string[] | null;
  categories: string[];
  playlist: Tune[];
};
export type ProgramBrowser = Omit<Program, 'playlist'> & {
  playlist: TuneBrowser[];
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
  artist: ArtistBrowser;
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
