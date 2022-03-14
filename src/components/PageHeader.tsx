import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import AppLink from 'gatsby-theme-aoi/src/components/AppLink';
import NationLabel from './NationLabel';
import TextSpan from './TextSpan';
import { Maybe, Program, Artist } from '../../graphql-types';

interface StylesProps {
  image?: string | null;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: 240,
      padding: theme.spacing(2, 0),
      background: theme.palette.background.paper,
    },
    left: {
      width: '50%',
      maxWidth: 280,
      padding: theme.spacing(0, 1),
      display: 'flex',
      flexShrink: 0,
    },
    image: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700],
      backgroundImage: ({ image }) => (image ? `url(${image})` : undefined),
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      flexGrow: 1,
      position: 'relative',
    },
    label: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    right: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(0, 1),
      justifyContent: 'space-between',
    },
  })
);

interface Props {
  image?: string | null;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  label?: React.ReactNode;
}

function PageHeader({ image, top, bottom, label }: Props): JSX.Element {
  const classes = useStyles({ image });
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <div className={classes.image}>{label ? <div className={classes.label}>{label}</div> : null}</div>
      </div>
      <div className={classes.right}>
        <div>{top}</div>
        <div>{bottom}</div>
      </div>
    </div>
  );
}

PageHeader.defaultProps = {
  image: undefined,
  top: undefined,
  bottom: undefined,
  label: undefined,
};

const useTypoStyles = makeStyles((theme) =>
  createStyles({
    title: {
      fontWeight: theme.typography.fontWeightBold,
      lineHeight: 1.2,
    },
  })
);

export function ProgramPageHeader({
  program,
}: {
  program: Maybe<Pick<Program, 'fields' | 'week' | 'date' | 'playlist' | 'title' | 'subtitle' | 'categories'>>;
}): JSX.Element {
  const classes = useTypoStyles();
  return (
    <PageHeader
      image={program?.fields?.image}
      top={
        <>
          <Typography variant="body2" color="textSecondary">
            <TextSpan>{`第${program?.week}回`}</TextSpan>
            <TextSpan>{program?.date}</TextSpan>
            <TextSpan>全{program?.playlist?.length ?? '**'}曲</TextSpan>
          </Typography>
          <Typography className={classes.title} variant="h6" component="h2">
            {program?.title}
          </Typography>
          {program?.subtitle ? <Typography variant="body2">{program.subtitle}</Typography> : null}
        </>
      }
      bottom={
        <>
          <Typography variant="body2">
            {program?.categories?.map((category) => (
              <TextSpan key={category}>
                <AppLink to="/categories" state={{ category: category ?? undefined }}>
                  {category}
                </AppLink>
              </TextSpan>
            ))}
          </Typography>
        </>
      }
    />
  );
}

export function ArtistPageHeader({
  artist,
}: {
  artist: Maybe<Pick<Artist, 'image' | 'name' | 'nation' | 'tunesCount' | 'programCount'>>;
}): JSX.Element {
  const classes = useTypoStyles();
  return (
    <PageHeader
      image={artist?.image}
      label={<NationLabel nation={artist?.nation ?? ''} />}
      top={
        <>
          <Typography className={classes.title} variant="h6" component="h2">
            {artist?.name}
          </Typography>
          <Typography variant="body2">{artist?.nation}</Typography>
        </>
      }
      bottom={
        <>
          <Typography variant="body1">
            {artist?.tunesCount}曲/{artist?.programCount}回
          </Typography>
        </>
      }
    />
  );
}

export default PageHeader;
