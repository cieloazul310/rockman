import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import { Chart, BarSeries, PieSeries, Title, ArgumentAxis, ValueAxis, Legend } from '@devexpress/dx-react-chart-material-ui';
// import { Palette } from '@devexpress/dx-react-chart';
// import { useDecades, useSchemeNations } from '../utils/graphql-hooks';
// import { useGetNationColor } from '../utils/getNationColor';

const useTitleStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      textAlign: 'center',
      padding: theme.spacing(2),
    },
  })
);

function TitleComponent({ text }: Title.TextProps) {
  const classes = useTitleStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h3">
        {text}
      </Typography>
    </div>
  );
}
/*
export function DecadesRank() {
  const { palette } = useTheme();
  const decades = useDecades();
  return (
    <div>
      <Chart data={decades} height={400}>
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField="value" argumentField="fieldValue" color={palette.primary.main} />
        <Title text="年代別曲数" textComponent={TitleComponent} />
      </Chart>
    </div>
  );
}
*/
/*
export function NationsRank() {
  const nations = useSchemeNations();
  const getNationColor = useGetNationColor();
  const scheme = nations.map((nation) => getNationColor(nation.nation ?? ''));
  return (
    <div>
      <Chart data={nations} height={400}>
        <Palette scheme={scheme} />
        <PieSeries valueField="tunesCount" argumentField="nation" innerRadius={0.6} name="地域" />
        <Legend />
        <Title text="地域別曲数" textComponent={TitleComponent} />
      </Chart>
    </div>
  );
}
*/
