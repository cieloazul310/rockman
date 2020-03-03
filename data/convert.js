const fs = require('fs');
const d3 = require('d3-dsv');
const YAML = require('yaml');

const weeks = d3.csvParse(fs.readFileSync('./data/raw/programs-programs.csv', 'utf-8'), (row, index, columns) => {
  row["week"] = parseInt(row["week"], 10);
  return row;
});
const songs = d3.csvParse(fs.readFileSync('./data/raw/playlist-playlist.csv', 'utf-8'), (row, index, columns) => {
  row["id"] = parseInt(row["id"], 10);
  row["week"] = parseInt(row["week"], 10);
  row["year"] = parseInt(row["year"], 10);
  return row;
});

weeks.forEach((d, i) => {
  const year = new Date(d.date).getFullYear();
  const week = d.week;
  const outputPath = `./data/yaml/${year}`;
  const fileName = `${outputPath}/${week.toString().padStart(4, '0')}.yaml`;
  const playlist = songs
    .filter(song => song.week === week)
    .map((tune, index) => ({
      ...tune,
      id: `${year.toString()}${week.toString().padStart(4, '0')}${(i + 1)
        .toString()
        .padStart(2, '0')}`,
      index: tune.id,
      indexInWeek: index + 1,
      selector: '草野マサムネ',
      producer: tune.producer ? [tune.producer] : []
    }));

  const weekJson = {
    id: `${year}${week.toString().padStart(4, '0')}`,
    week: d.week,
    year: year,
    title: d.theme,
    subtitle: "",
    guests: [],
    categories: [],
    date: d.date,
    playlist: playlist
  };

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }
  fs.writeFile(fileName, YAML.stringify(weekJson), err => {
    if (err) throw err;
    console.log(`${fileName} exported!`);
  });
});

/* toml

const playlistString = playlist.map(tune =>
    [
      `[[playlist]]`,
      `  week = ${tune.week}`,
      `  title = "${tune.name}"`,
      `  kana = "${tune.kana}"`,
      `  artist = "${tune.artist}"`,
      `  year = ${tune.year}`,
      `  nation = "${tune.nation}"`,
      `  label = "${tune.label}"`,
      `  producer = ["${tune.producer}"]`,
      `  youtube = "${tune.youtube}"`,
      `  selectedBy = "草野マサムネ"`,
      `  corner = "${tune.corner}"`,
      ``
    ].join('\n')
  ).join('\n');
  const tomlString = [
    ``,
    `week = ${week}`,
    `title = "${d.theme}"`,
    `subtitle = ""`,
    `categories = []`,
    `date = "${d.date}"`,
    ``,
    ``
  ].join('\n').concat(playlistString);

*/
