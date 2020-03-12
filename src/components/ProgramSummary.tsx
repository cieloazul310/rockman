import * as React from 'react';
import { navigate } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppLink from 'gatsby-theme-aoi/src/components/AppLink';
import SimpleNationBar from './SimpleNationBar';
import SimpleYearsBar from './SimpleYearsBar';
import { getPlaylistStrings } from '../utils/filterPlaylist';
import { CategoryIcon, SelectorIcon } from '../icons';
import { QueriedProgram } from '../types';

interface StyleProps {
  open: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    expandIcon: {
      transform: ({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)'),
      transition: theme.transitions.create('transform'),
    },
    tagsOuter: {
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollbarWidth: 'none',
      minHeight: 40,
      WebkitOverflowScrolling: 'touch',
    },
    summaryArtists: {
      display: 'inline-block',
      '&:not(:last-child)': {
        marginRight: theme.spacing(1),
      },
    },
  })
);

interface Props {
  program: QueriedProgram;
  enableLink?: boolean;
  defaultOpen?: boolean;
}

function ProgramSummary({
  program,
  enableLink = false,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = React.useState(defaultOpen);
  const classes = useStyles({ open });
  const _handleOpen = () => {
    setOpen(!open);
  };
  return (
    <Box py={2}>
      <Box display="flex" height={140} flexDirection="column">
        <Box display="flex" flex="1">
          <Box flex="1" display="flex" flexDirection="column" minWidth={0}>
            <Box>
              <Typography variant="subtitle2" component="span">
                第{program.week}回 {program.date} 全{program.playlist.length}曲
              </Typography>
            </Box>
            <Box
              flex="1"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Typography variant="h6" component="h2">
                {enableLink ? (
                  <AppLink color="textPrimary" to={program.fields.slug}>
                    {program.title}
                  </AppLink>
                ) : (
                  program.title
                )}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box>
              <IconButton onClick={_handleOpen} aria-label="Toggle Summary">
                <ExpandMoreIcon className={classes.expandIcon} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box className={classes.tagsOuter}>
          <CategoriesAndSelectors program={program} />
        </Box>
      </Box>
      <Collapse in={open} unmountOnExit>
        <Box pb={1}>
          {program.subtitle ? (
            <Typography variant="subtitle1" gutterBottom>
              {program.subtitle}
            </Typography>
          ) : null}
          <Box>
            <Box component="ul" padding="inherit" margin="inherit">
              {getPlaylistStrings(program.playlist.slice(1), 'artist').map(
                artist => (
                  <Typography
                    variant="body2"
                    component="li"
                    key={artist}
                    className={classes.summaryArtists}
                  >
                    <AppLink to={`/artist/${artist}/`} color="textSecondary">
                      {artist}
                    </AppLink>
                  </Typography>
                )
              )}
            </Box>
          </Box>
          <Box pt={1}>
            <SimpleNationBar playlist={program.playlist} />
            <SimpleYearsBar playlist={program.playlist} />
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
export default ProgramSummary;

const useChipStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: `0 ${theme.spacing(0.5)}px ${theme.spacing(1)}px 0`,
    },
  })
);

function CategoriesAndSelectors({
  program,
}: {
  program: Pick<QueriedProgram, 'categories' | 'guests'>;
}) {
  const classes = useChipStyles();
  return (
    <Box width="max-content">
      {program.categories && program.categories.length
        ? program.categories.map(category => (
            <Chip
              className={classes.chip}
              key={category}
              label={category}
              color="primary"
              size="small"
              icon={<CategoryIcon />}
              onClick={() => {
                navigate('/categories/', {
                  state: {
                    category,
                  },
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
              size="small"
              icon={<SelectorIcon />}
              onClick={() => {
                navigate('/selectors/', {
                  state: {
                    selector: guest,
                  },
                });
              }}
            />
          ))
        : null}
    </Box>
  );
}
