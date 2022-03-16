import * as React from 'react';
import { useInView } from 'react-intersection-observer';
// import FallBack from './FallBack';
import Loader from './Loader';

interface Props {
  children: React.ReactNode;
}

function InView({ children }: Props) {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return <div ref={ref}>{inView ? children : <Loader />}</div>;
}

export default InView;
