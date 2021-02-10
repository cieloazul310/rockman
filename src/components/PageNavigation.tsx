import * as React from 'react';
import clsx from 'clsx';
import { Link as GatsbyLink } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
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
      padding: theme.spacing(0, 1),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      borderRight: `1px solid ${theme.palette.divider}`,
      transition: theme.transitions.create('background'),
      [theme.breakpoints.only('xs')]: {
        width: '100%',
        borderRight: 'none',
      },
      '&:hover': {
        background: theme.palette.grey[theme.palette.type === 'light' ? 100 : 700],
      },
    },
    itemRight: {
      flexDirection: 'row-reverse',
      borderRight: 'none',
    },
    disabled: {
      background: theme.palette.grey[theme.palette.type === 'light' ? 100 : 700],
    },
    itemIcon: {
      padding: theme.spacing(2),
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
  return (
    <ButtonBase
      classes={{
        root: clsx(classes.item, { [classes.itemRight]: navigation === 'next' }),
        disabled: classes.disabled,
      }}
      disabled={!Boolean(item)}
      component={GatsbyLink}
      to={variant === 'program' ? item?.fields?.slug ?? '#' : `/artist/${item?.name}`}
    >
      {item ? (
        <>
          <div className={classes.itemIcon}>{navigation === 'previous' ? <ArrowBackIcon /> : <ArrowForwardIcon />}</div>
          <div className={classes.itemAvatar}>
            <Avatar src={variant === 'program' ? item.fields?.image ?? undefined : item.image ?? undefined}>
              {variant === 'program' ? <ProgramIcon /> : <ArtistIcon />}
            </Avatar>
          </div>
          <div className={clsx(classes.itemText, { [classes.itemTextRight]: navigation === 'next' })}>
            <Typography>{variant === 'program' ? item?.title : item?.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {variant === 'program' ? `第${item?.week}回` : `${item?.tunesCount}曲/${item?.programCount}回`}
            </Typography>
          </div>
        </>
      ) : null}
    </ButtonBase>
  );
}

interface Props {
  variant: 'program' | 'artist';
  pageContext: Pick<SitePageContext, 'next' | 'previous'>;
}

function PageNavigation({ variant, pageContext }: Props) {
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
