import type { Node } from 'gatsby';

export type Artist<T extends 'bare' | 'node' | 'browser' = 'browser'> = Node & {
  name: string;
  kana?: string | null;
  sortName: T extends 'bare' ? never : string;
  nation: string;
  slug: string;
  program: T extends 'browser'
    ? {
        programs: Program[];
        programsCount: number;
        tunes: Tune[];
        tunesCount: number;
        image: string | null;
        relatedArtists: Artist<'browser'>[];
      }
    : never;
};

export type MinimumArtist = Pick<ArtistBrowser, 'name' | 'slug' | 'nation'> & {
  program: Pick<ArtistBrowser['program'], 'programsCount' | 'tunesCount' | 'image'>;
};

export type ArtistListItem = Pick<ArtistBrowser, 'name' | 'slug' | 'nation' | 'kana'> & {
  program: Pick<ArtistBrowser['program'], 'programsCount' | 'tunesCount' | 'image'>;
};

export type Program<T extends 'bare' | 'node' | 'browser' = 'browser'> = Node & {
  id: string;
  week: number;
  year: number;
  date: string;
  slug: T extends 'bare' ? null : string;
  title: string;
  subtitle: string | null;
  image: T extends 'browser' ? string | null : never;
  guests: string[] | null;
  categories: string[];
  playlist: Tune<T>[];
};

export type ProgramList = Pick<ProgramBrowser, 'id' | 'date' | 'title' | 'slug' | 'image' | 'week'>;

export type Tune<T extends 'bare' | 'node' | 'browser' = 'browser'> = {
  id: string;
  index: number;
  indexInWeek: number;
  week: number;
  title: string;
  artist: T extends 'browser' ? Artist : string;
  kana: string | null;
  year: number;
  nation: string;
  label: string | null;
  corner: string | null;
  youtube: string | null;
  selector: string;
  program: T extends 'browser' ? Program : null;
};

export type TuneFields = Pick<
  TuneBrowser,
  'id' | 'title' | 'indexInWeek' | 'artist' | 'corner' | 'selector' | 'year' | 'youtube' | 'nation'
> & {
  artist: MinimumArtist;
};

export type SpitzAlbum<T extends 'bare' | 'node' | 'browser' = 'browser'> = {
  id: string;
  albumIdNum: number;
  year: number;
  title: string;
  tunes: SpitzTune<T>[];
};

export type SpitzTune<T extends 'bare' | 'node' | 'browser' = 'browser'> = {
  id: string;
  index: number;
  title: string;
  program: T extends 'browser' ? Program<'browser'> : never;
};

export type Selector = {
  name: string;
  programs: ProgramBrowser;
  programsCount: number;
  tunesCount: number;
};
