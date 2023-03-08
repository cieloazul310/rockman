import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { AppLink } from '@cieloazul310/gatsby-theme-aoi';
import TextSpan from '../TextSpan';
import type { Program } from '../../../types';

type ProgramTitleBareProps = {
  headerText?: React.ReactNode;
  title?: React.ReactNode;
  footerText?: React.ReactNode | null;
};

export function ProgramTitleBare({
  headerText = <Skeleton width={100} />,
  title = <Skeleton width={260} />,
  footerText,
}: ProgramTitleBareProps) {
  return (
    <Box component="header" pb={1}>
      <Typography variant="body2" color="textSecondary">
        {headerText}
      </Typography>
      <Typography fontWeight="bold">{title}</Typography>
      {footerText ? <Typography variant="body2">{footerText}</Typography> : null}
    </Box>
  );
}

ProgramTitleBare.defaultProps = {
  headerText: <Skeleton width={100} />,
  title: <Skeleton width={260} />,
  footerText: undefined,
};

type ProgramTitleProps = Pick<Program, 'week' | 'date' | 'slug' | 'title' | 'subtitle'>;

function ProgramTitle({ week, date, slug, title, subtitle }: ProgramTitleProps) {
  return (
    <ProgramTitleBare
      title={<AppLink href={slug}>{title}</AppLink>}
      headerText={
        <>
          <TextSpan label={`第${week}回`} />
          <TextSpan label={date} />
        </>
      }
      footerText={subtitle}
    />
  );
}

export default ProgramTitle;
