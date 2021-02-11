import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { TuneProps } from './Tune';
import TunesByProgram, { TunesByProgramSkeleton, TunesByProgramProps } from './TunesByProgram';
import { useDividedPrograms } from '../utils/useDividedArray';

interface DisplayOnScreenProps {
  children: React.ReactNode;
  margin?: number;
  once?: boolean;
}

function DisplayOnScreen({ children, margin = 0, once = true }: DisplayOnScreenProps) {
  const [ref, inView] = useInView({
    rootMargin: `${margin}px`,
    triggerOnce: once,
  });

  return (
    <div ref={ref}>
      {inView ? (
        children
      ) : (
        <div>
          <TunesByProgramSkeleton />
        </div>
      )}
    </div>
  );
}

interface Props {
  programs: TunesByProgramProps['program'][];
  divisor?: number;
  filter?: (tune: TuneProps['tune']) => boolean;
}

function LazyViewer({ programs, filter = () => true, divisor = 15 }: Props) {
  const dividedItems = useDividedPrograms(programs, divisor, filter);
  const renderItems = React.useMemo(() => {
    return dividedItems.map((d, i) =>
      i === 0 ? (
        <div key={i}>
          {d.map((v) => (
            <TunesByProgram program={v} key={v?.id} />
          ))}
        </div>
      ) : (
        <DisplayOnScreen key={i} margin={40}>
          {d.map((v) => (
            <TunesByProgram program={v} key={v?.id} />
          ))}
        </DisplayOnScreen>
      )
    );
  }, [dividedItems]);
  return <div>{renderItems}</div>;
}

export default LazyViewer;
