import { AbstractProgram } from '../types';
import { ProgramPlaylist } from '../../graphql-types';

export function getAllTunes(programs: AbstractProgram[]): ProgramPlaylist[] {
  return programs.reduce((accum, curr) => [...accum, ...curr.playlist], []);
}

export function getProgramsContainsValue(
  playlistKey: keyof ProgramPlaylist,
  value: any
) {
  return (programs: AbstractProgram[]): AbstractProgram[] => {
    return programs.filter(
      program =>
        program.playlist.map(tune => tune[playlistKey]).indexOf(value) >= 0
    );
  };
}

export function filterPlaylist(playlistKey: keyof ProgramPlaylist, value: any) {
  return (programs: AbstractProgram[]): ProgramPlaylist[] => {
    return programs.reduce(
      (accum, curr) => [
        ...accum,
        ...curr.playlist.filter(tune => tune[playlistKey] === value),
      ],
      []
    );
  };
}

export function getPlaylistStrings(
  playlist: ProgramPlaylist[],
  key: keyof ProgramPlaylist
): string[] {
  return playlist.reduce((accum, curr) => {
    if (accum.indexOf(curr[key]) >= 0) {
      return accum;
    } else {
      return [...accum, curr[key]];
    }
  }, []);
}
