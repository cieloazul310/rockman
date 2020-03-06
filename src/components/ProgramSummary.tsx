import * as React from 'react';
import { navigate } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CategoryIcon, SelectorIcon } from '../icons';
import { AppLink } from 'gatsby-theme-typescript-material-ui/src/components/AppLink';
import SimpleNationBar from './SimpleNationBar';
import SimpleYearsBar from './SimpleYearsBar';
import { Program } from '../../graphql-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 280,
      padding: `${theme.spacing(6)}px 0`,
      display: 'flex',
      flexDirection: 'column',
    },
    summaryHeader: {
      flex: 1,
    },
    chip: {
      margin: `0 ${theme.spacing(0.5)}px ${theme.spacing(1)}px 0`,
    },
    titleLink: {
      color: theme.palette.text.primary,
    },
  })
);

interface Props {
  program: Exclude<Partial<Program>, 'children' | 'internal'>;
  enableLink?: boolean;
}

function ProgramSummary({ program, enableLink = false }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.summaryHeader}>
        <Typography variant="subtitle2" component="span">
          第{program.week}回 {program.date}
        </Typography>
        {enableLink ? (
          <Typography variant="h5" component="h2" gutterBottom>
            <AppLink to={program.fields.slug} className={classes.titleLink}>
              {program.title}
            </AppLink>
          </Typography>
        ) : (
          <Typography variant="h5" component="h2" gutterBottom>
            {program.title}
          </Typography>
        )}
        {program.subtitle ? (
          <Typography variant="subtitle1" gutterBottom>
            {program.subtitle}
          </Typography>
        ) : null}
      </div>
      <div>
        {program.categories && program.categories.length
          ? program.categories.map(category => (
              <Chip
                className={classes.chip}
                key={category}
                label={category}
                color="primary"
                icon={<CategoryIcon />}
                onClick={() => {
                  navigate('/categories/', {
                    state: {
                      category
                    },
                    replace: true
                  });
                }}
              />
            ))
          : null}
        {program.guests && program.guests.length
          ? program.guests.map(guest => (
              <Chip
                className={classes.chip}
                key={guest}
                label={guest}
                icon={<SelectorIcon />}
                onClick={() => {
                  navigate('/selectors/', {
                    state: {
                      selector: guest
                    },
                    replace: true
                  });
                }}
              />
            ))
          : null}
      </div>
      <SimpleNationBar playlist={program.playlist} />
      <SimpleYearsBar playlist={program.playlist} />
    </div>
  );
}
export default ProgramSummary;
