import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import FallBack from './FallBack';

interface Props {
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[] | string;
}

function InView({ children }: Props) {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return <div ref={ref}>{inView ? children : <FallBack color="secondary" />}</div>;
}

export default InView;
