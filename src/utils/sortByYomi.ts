/*
export default function sortByYomi(a: YamlPlaylist, b: YamlPlaylist) {
                 return getYomi(a) !== getYomi(b)
                   ? getYomi(a).localeCompare(getYomi(b))
                   : sortByYear(a, b);
               }
               */
export function getYomi(artistName: string, kana: string) {
  const the = artistName.slice(0, 4);
  if (the === 'The ' || the === 'THE ' || the === 'the ')
    return artistName.slice(4);
  return kana || artistName;
}

export function encodeArtistName(artistName: string) {
  return encodeURIComponent(artistName.replace(/[' ']+/g, '_'));
}

export function decodeArtistName(artistName: string) {
  return decodeURIComponent(artistName.replace(/['_']+/g, ' '));
}
