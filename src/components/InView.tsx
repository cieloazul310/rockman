import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import FallBack from './FallBack';

interface Props {
  children: React.ReactNode;
}

function InView({ children }: Props) {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return <div ref={ref}>{inView ? children : <FallBack color="secondary" />}</div>;
}

export default InView;
