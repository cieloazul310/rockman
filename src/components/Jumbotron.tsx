import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Jumbotron as AoiJumbotron, JumbotronProps as AoiJumbotronProps } from '@cieloazul310/gatsby-theme-aoi';

type JumbotronProps = Omit<AoiJumbotronProps, 'title' | 'disableGradient' | 'maxWidth'> & {
  headerText?: React.ReactNode;
  title: React.ReactNode;
  footerText?: React.ReactNode;
  image?: string;
};

function Jumbotron({ headerText, footerText, title, image, ...props }: JumbotronProps) {
  const { palette } = useTheme();
  return (
    <AoiJumbotron maxWidth="md" disableGradient={palette.mode === 'light'} bgImage={image} {...props}>
      {headerText ? <Typography>{headerText}</Typography> : null}
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      {footerText ? <Typography>{footerText}</Typography> : null}
    </AoiJumbotron>
  );
}

Jumbotron.defaultProps = {
  headerText: undefined,
  footerText: undefined,
  image: undefined,
};

export default Jumbotron;
