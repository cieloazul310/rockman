import * as React from 'react';
import Section from '../src/components/Section';
import TakeOffAlbum, { TakeOffOthers } from '../src/components/TakeOffAlbum';
import { album, others } from './TakeOff.data';

const stories = { title: 'TakeOff' };
export default stories;

export function Album() {
  return (
    <Section>
      <TakeOffAlbum album={album} />
    </Section>
  );
}

export function Others() {
  return (
    <Section>
      <TakeOffOthers albums={others} />
    </Section>
  );
}
