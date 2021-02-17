import * as React from 'react';
import Box from '@material-ui/core/Box';
import Section from '../src/components/Section';
import PageNavigation from '../src/components/PageNavigation';
import DrawerNavigation from '../src/components/DrawerNavigation';

const stories = { title: 'PageNavigation' };
export default stories;

const programContext = {
  next: {
    title: 'ほにゃららほにゃららほにゃららほにゃららで漫遊記',
    week: 20,
    date: '2021-02-10',
    fields: {
      slug: 'program/20210020',
    },
  },
  previous: {
    title: 'ほにゃららほにゃららほにゃららほにゃららで漫遊記',
    week: 18,
    date: '2021-01-27',
    fields: {
      slug: 'program/20210018',
      image: 'https://i.ytimg.com/vi/XvRQDsH0Yho/0.jpg',
    },
  },
};
const artistContext = {
  next: {
    name: '柴田聡子',
    tunesCount: 2,
    programCount: 2,
    image: 'https://i.ytimg.com/vi/B4oFhYVSzjc/0.jpg',
  },
  previous: {
    name: 'カネコアヤノ',
    tunesCount: 3,
    programCount: 1,
    image: 'https://i.ytimg.com/vi/_qDgLENi2dA/0.jpg',
  },
};

export function Program(): JSX.Element {
  return (
    <Section>
      <PageNavigation variant="program" pageContext={programContext} />
    </Section>
  );
}

export function ProgramFirst(): JSX.Element {
  return (
    <Section>
      <PageNavigation variant="program" pageContext={{ next: programContext.next }} />
    </Section>
  );
}

export function Artist(): JSX.Element {
  return (
    <Section>
      <PageNavigation variant="artist" pageContext={artistContext} />
    </Section>
  );
}

export function ArtistEnd(): JSX.Element {
  return (
    <Section>
      <PageNavigation variant="artist" pageContext={{ previous: artistContext.previous }} />
    </Section>
  );
}

export function DrawerProgram(): JSX.Element {
  return (
    <Box width={280} bgcolor="background.paper">
      <DrawerNavigation variant="program" pageContext={programContext} />
    </Box>
  );
}

export function DrawerArtist(): JSX.Element {
  return (
    <Box width={280} bgcolor="background.paper">
      <DrawerNavigation variant="artist" pageContext={artistContext} />
    </Box>
  );
}
