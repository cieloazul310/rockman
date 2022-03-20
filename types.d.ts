export type Artist = {
  id: string;
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

export type MinimumArtist = Pick<ArtistBrowser, 'name' | 'slug' | 'nation'> & {
  program: Pick<ArtistBrowser['program'], 'programsCount' | 'tunesCount' | 'image'>;
};

export type ArtistListItem = Pick<ArtistBrowser, 'name' | 'slug' | 'nation' | 'kana'> & {
  program: Pick<ArtistBrowser['program'], 'programsCount' | 'tunesCount' | 'image'>;
};

export type Program = {
  id: string;
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
export type ProgramList = Pick<ProgramBrowser, 'id' | 'date' | 'title' | 'slug' | 'image' | 'week'>;

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

export type TuneFields = Pick<
  TuneBrowser,
  'id' | 'title' | 'indexInWeek' | 'artist' | 'corner' | 'selector' | 'year' | 'youtube' | 'nation'
> & {
  artist: MinimumArtist;
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
  program: ProgramBrowser[];
};

export type Selector = {
  name: string;
  programs: ProgramBrowser;
  programsCount: number;
  tunesCount: number;
};
