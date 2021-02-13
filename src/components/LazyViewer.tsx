import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { TuneProps } from './Tune';
import TunesByProgram, { TunesByProgramSkeleton, TunesByProgramProps } from './TunesByProgram';
import { useDividedPrograms } from '../utils/useDividedArray';

interface DisplayOnScreenProps {
  children: React.ReactNode;
  margin?: number;
  once?: boolean;
  onSeem?: (inView?: boolean) => void;
}

function DisplayOnScreen({ children, onSeem, margin = 0, once = true }: DisplayOnScreenProps) {
  const [ref, inView] = useInView({
    rootMargin: `${margin}px`,
    triggerOnce: once,
  });
  React.useEffect(() => {
    if (inView && onSeem) {
      onSeem(inView);
    }
  }, [inView, onSeem]);

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
  onSeem?: (inView?: boolean) => void;
}

function LazyViewer({ programs, onSeem, filter = () => true, divisor = 15 }: Props) {
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
        <DisplayOnScreen key={i} margin={40} onSeem={onSeem}>
          {d.map((v) => (
            <TunesByProgram program={v} key={v?.id} />
          ))}
        </DisplayOnScreen>
      )
    );
  }, [dividedItems, onSeem]);
  return <div>{renderItems}</div>;
}

export default LazyViewer;
