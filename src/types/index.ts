import { Program, ProgramPlaylist } from '../../graphql-types';

export type QueriedProgram = Omit<Program, 'children' | 'internal'>;
export type AbstractProgram = QueriedProgram | Program;

// [artist, kana, nation, playlist]
export type ArtistItem = [string, string, string, ProgramPlaylist[]];

// [category, Programs]
export type CategoryItem = [string, QueriedProgram[]];

// [selector, Programs, number of tunes]
export type SelectorItem = [string, QueriedProgram[], number];

// [corner, Programs, number of tunes]
export type CornerItem = [string, QueriedProgram[], number];
