import * as React from 'react';
import clsx from 'clsx';
import { Link as GatsbyLink } from 'gatsby';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import ButtonBase from '@mui/material/ButtonBase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ProgramIcon, ArtistIcon } from '../icons';
import { SitePageContext } from '../../graphql-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.only('xs')]: {
        flexDirection: 'column',
      },
    },
    item: {
      width: '50%',
      flexShrink: 0,
      display: 'flex',
      transition: theme.transitions.create('background'),
      [theme.breakpoints.only('xs')]: {
        width: '100%',
        borderRight: 'none',
      },
      '&:hover': {
        background: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 700],
      },
    },
    itemInside: {
      flexGrow: 1,
      padding: theme.spacing(1, 7, 1, 1),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRight: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.only('xs')]: {
        borderRight: 'none',
      },
    },
    itemRight: {
      padding: theme.spacing(1, 1, 1, 7),
      flexDirection: 'row-reverse',
      borderRight: 'none',
    },
    disabled: {
      background: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800],
    },
    itemIcon: {
      padding: theme.spacing(2, 1),
    },
    itemAvatar: {
      padding: theme.spacing(0, 1),
    },
    itemText: {
      display: 'flex',
      flexDirection: 'column',
    },
    itemTextRight: {
      alignItems: 'flex-end',
    },
  })
);

interface PageNavigationButtonProps {
  variant: 'program' | 'artist';
  item: SitePageContext['previous'] | SitePageContext['next'];
  navigation: 'previous' | 'next';
}

function PageNavigationButton({ variant, item, navigation }: PageNavigationButtonProps) {
  const classes = useStyles();
  const isProgram = variant === 'program';
  const isNext = navigation === 'next';
  return (
    <ButtonBase
      classes={{
        root: classes.item,
        disabled: classes.disabled,
      }}
      disabled={!item}
      component={GatsbyLink}
      to={isProgram ? item?.fields?.slug ?? '#' : item?.slug ?? '#'}
    >
      {item ? (
        <div className={clsx(classes.itemInside, { [classes.itemRight]: isNext })}>
          <div className={classes.itemIcon}>{isNext ? <ArrowForwardIcon /> : <ArrowBackIcon />}</div>
          <div className={classes.itemAvatar}>
            <Avatar src={isProgram ? item.fields?.image ?? undefined : item.image ?? undefined}>
              {isProgram ? <ProgramIcon /> : <ArtistIcon />}
            </Avatar>
          </div>
          <div className={clsx(classes.itemText, { [classes.itemTextRight]: isNext })}>
            <Typography variant="body2">{isProgram ? item?.title : item?.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {isProgram ? `第${item?.week}回` : `${item?.tunesCount}曲/${item?.programCount}回`}
            </Typography>
          </div>
        </div>
      ) : null}
    </ButtonBase>
  );
}

interface Props {
  variant: 'program' | 'artist';
  pageContext: Pick<SitePageContext, 'next' | 'previous'>;
}

function PageNavigation({ variant, pageContext }: Props): JSX.Element {
  const { previous, next } = pageContext;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PageNavigationButton variant={variant} item={previous} navigation="previous" />
      <PageNavigationButton variant={variant} item={next} navigation="next" />
    </div>
  );
}

export default PageNavigation;
