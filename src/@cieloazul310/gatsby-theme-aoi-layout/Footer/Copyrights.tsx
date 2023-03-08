import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppLink, useSiteMetadata } from '@cieloazul310/gatsby-theme-aoi';

function CopyrightsContent({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        padding: 1,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}

function Copyrights() {
  const { title, author } = useSiteMetadata();
  return (
    <div>
      <CopyrightsContent>
        <Typography variant="body1">{title}</Typography>
      </CopyrightsContent>
      <CopyrightsContent>
        <Typography variant="body2" component="small">
          © {new Date().getFullYear()} {author} All rights reserved. Built with
          {` `}
          <AppLink href="https://www.gatsbyjs.com/">Gatsby</AppLink>
        </Typography>
      </CopyrightsContent>
    </div>
  );
}

export default Copyrights;
