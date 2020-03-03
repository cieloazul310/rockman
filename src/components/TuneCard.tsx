import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import PersonIcon from '@material-ui/icons/Person';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import FaceIcon from '@material-ui/icons/Face';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AppLink } from 'gatsby-theme-typescript-material-ui/src/components/AppLink';
import NationAvatar from './NationAvatar';
import { YamlPlaylist } from '../../graphql-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    cardRight: {
      flex: 1
    },
    cardSubheader: {
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`
    },
    cardThumbnail: {
      flex: 'auto',
      maxWidth: '30%',
      backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
      display: 'flex'
    },
    cardThumbnailLink: {
      flex: 1,
      display: 'flex'
    },
    cardThumbnailInner: {
      flex: 1
    }
  })
);

interface Props {
  tune: YamlPlaylist;
}

function TuneCard({ tune }: Props) {
  const classes = useStyles();
  return (
    <Box my={2}>
      <Card className={classes.root}>
        <div className={classes.cardThumbnail}>
          {tune.youtube ? (
            <a
              className={classes.cardThumbnailLink}
              href={`https://youtu.be/${tune.youtube}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CardMedia
                className={classes.cardThumbnailInner}
                image={`https://i.ytimg.com/vi/${tune.youtube}/0.jpg`}
                title={`${tune.title} をYouTubeで視聴する`}
              />
            </a>
          ) : null}
        </div>
        <div className={classes.cardRight}>
          <div className={classes.cardSubheader}>
            <Typography variant="body2">
              M{tune.indexInWeek}. {tune.corner}{' '}
              {tune.selector !== '草野マサムネ' ? `${tune.selector}選曲` : null}
            </Typography>
          </div>
          <CardHeader
            avatar={<NationAvatar nation={tune.nation} />}
            title={tune.title}
            subheader={`${tune.artist} (${tune.year})`}
          />
          <CardActions>
            <Tooltip title={`${tune.artist}の曲をブラウズ`}>
              <IconButton>
                <PersonIcon />
              </IconButton>
            </Tooltip>
            {tune.selector !== '草野マサムネ' ? (
              <Tooltip title={`${tune.selector}選曲の曲をブラウズ`}>
                <IconButton>
                  <FaceIcon />
                </IconButton>
              </Tooltip>
            ) : null}
            {tune.youtube ? (
              <Tooltip title="YouTube で視聴する">
                <IconButton
                  href={`https://youtu.be/${tune.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MusicNoteIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </CardActions>
        </div>
      </Card>
    </Box>
  );
}

export default TuneCard;
