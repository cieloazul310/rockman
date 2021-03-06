import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { TuneProps } from './Tune';
import TunesByProgram, { TunesByProgramSkeleton, TunesByProgramProps } from './TunesByProgram';
import { useDividedPrograms } from '../utils/useDividedArray';

interface DisplayOnScreenProps {
  children: React.ReactNode;
  margin?: number;
  once?: boolean;
  onSeem?: (() => void) | ((inView: boolean) => void);
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

DisplayOnScreen.defaultProps = {
  margin: 0,
  once: true,
  onSeem: undefined,
};

interface Props {
  programs: TunesByProgramProps['program'][];
  divisor?: number;
  filter?: (tune: TuneProps['tune']) => boolean;
  onSeem?: (() => void) | ((inView: boolean) => void);
}

function LazyViewer({ programs, onSeem, filter = () => true, divisor = 15 }: Props): JSX.Element {
  const dividedItems = useDividedPrograms(programs, divisor, filter);
  const renderItems = React.useMemo(() => {
    return dividedItems.map((dividedItem, index) =>
      index === 0 ? (
        <div key={index.toString()}>
          {dividedItem.map((program) => (
            <TunesByProgram program={program} key={program?.id} />
          ))}
        </div>
      ) : (
        <DisplayOnScreen key={index.toString()} margin={40} onSeem={onSeem}>
          {dividedItem.map((program) => (
            <TunesByProgram program={program} key={program?.id} />
          ))}
        </DisplayOnScreen>
      )
    );
  }, [dividedItems, onSeem]);
  return <div>{renderItems}</div>;
}

LazyViewer.defaultProps = {
  divisor: 15,
  filter: () => true,
  onSeem: undefined,
};

export default LazyViewer;
