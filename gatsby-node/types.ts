import { Node } from 'gatsby';

export type Program = {
  week: number;
  year: number;
  title: string;
  subtitle?: string;
  guests?: string[];
  categories?: string[];
  date: string;
  playlist: ProgramPlaylist[];
  fields: {
    slug: string;
    image?: string;
  };
} & Pick<Node, 'id' | 'internal' | 'parent' | 'children' | 'owner'>;

export interface ProgramPlaylist {
  id: string;
  index?: number;
  indexInWeek: number;
  week: number;
  title: string;
  artist: {
    name: string;
  };
  kana?: string;
  year: number;
  nation: string;
  label?: string;
  producer?: string[];
  corner?: string;
  youtube?: string;
  selector: string;
}

export type Artist = {
  name: string;
  kana?: string;
  image?: string;
  sortNames: string;
  nation: string;
  program: Program[];
  tunes: ProgramPlaylist[];
  programCount: number;
  tunesCount: number;
} & Pick<Node, 'id' | 'internal' | 'parent' | 'children' | 'owner'>;

export type PureProgram = Omit<Program, 'playlist'> & {
  playlist: PurePlaylist[];
};

export type PurePlaylist = Omit<ProgramPlaylist, 'artist'> & {
  artist: string;
};

export interface PureArtist {
  name: string;
  kana?: string | null;
  nation: string;
  program: PureProgram[];
  tunes: PurePlaylist[];
}
