const fs = require('fs');
const path = require('path');
const d3 = require('d3-dsv');
// const yaml = require('yaml');

const data = d3.csvParse(fs.readFileSync(path.resolve(__dirname, './raw/spitzsongs.csv'), 'utf8'));
const albumIdNums = data.map((row) => row.albumIdNum);
const albums = Array.from(new Set(albumIdNums)).map((albumIdNum) => {
  const { albumId, year, album } = data[albumIdNums.indexOf(albumIdNum)];
  return {
    id: albumId,
    albumIdNum,
    year,
    title: album,
    tunes: data.filter((row) => row.albumId === albumId).map(({ id, index, title }) => ({ id, index: parseInt(index, 10), title })),
  };
});

// console.log(albums);

albums.forEach(({ tunes }) => {
  tunes.forEach((tune) => {
    console.log(tune);
  });
});
