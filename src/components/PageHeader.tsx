import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ProgramTemplateQuery, ArtistTemplateQuery } from '../../graphql-types';

interface StylesProps {
  image?: string | null;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: 200,
      padding: theme.spacing(2, 0),
    },
    left: {
      width: '50%',
      maxWidth: 280,
      padding: theme.spacing(0, 1),
      display: 'flex',
    },
    image: {
      backgroundColor: theme.palette.grey[700],
      backgroundImage: ({ image }) => (image ? `url(${image})` : undefined),
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      flexGrow: 1,
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
}

function PageHeader({ image, top, bottom }: Props) {
  const classes = useStyles({ image });
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <div className={classes.image} />
      </div>
      <div className={classes.right}>
        <div>{top}</div>
        <div>{bottom}</div>
      </div>
    </div>
  );
}

export function ProgramPageHeader({ program }: { program: ProgramTemplateQuery['program'] }) {
  return (
    <PageHeader
      image={program?.fields?.image}
      top={
        <>
          <Typography variant="body2">{program?.date}</Typography>
          <Typography variant="h4" component="h2">
            {program?.title}
          </Typography>
        </>
      }
      bottom={
        <>
          <Typography variant="caption">{program?.playlist?.length}回</Typography>
        </>
      }
    />
  );
}

export function ArtistPageHeader({ artist }: { artist: ArtistTemplateQuery['artist'] }) {
  return (
    <PageHeader
      image={artist?.image}
      top={
        <>
          <Typography variant="h4" component="h2">
            {artist?.name}
          </Typography>
          <Typography variant="body2">{artist?.nation}</Typography>
        </>
      }
      bottom={
        <>
          <Typography variant="caption">{artist?.programCount}回</Typography>
          <Typography variant="caption">{artist?.tunesCount}曲</Typography>
        </>
      }
    />
  );
}

export default PageHeader;
