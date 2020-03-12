import * as React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link as GatsbyLink } from 'gatsby';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 120,
      height: 120,
      padding: theme.spacing(1),
      boxSizing: 'border-box',
      transition: theme.transitions.create('background'),
      '&:hover': {
        backgroundColor: theme.palette.background.paper
      }
    }
  })
);

interface Props {
  icon: JSX.Element;
  label: string;
  to: string;
}

function NavigationBox({ icon, label, to }: Props) {
  const classes = useStyles();
  return (
    <ButtonBase className={classes.root} component={GatsbyLink} to={to}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="center">
          {icon}
        </Box>
        <Box display="flex" justifyContent="center">
          {label}
        </Box>
      </Box>
    </ButtonBase>
  );
}

export default NavigationBox;
