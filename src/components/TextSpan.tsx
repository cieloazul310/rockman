import * as React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginRight: theme.spacing(0.5),
      display: 'inline-block',
    },
  })
);

type Props = {
  children?: React.ReactNode | null;
} & Exclude<TypographyProps, 'children'>;

function TextSpan({ children, variant, ...props }: Props): JSX.Element | null {
  const classes = useStyles();
  if (!children) return null;
  return (
    <Typography className={classes.root} component="span" {...props} variant={variant ?? 'inherit'}>
      {children}
    </Typography>
  );
}

TextSpan.defaultProps = {
  children: undefined,
};

export default TextSpan;
