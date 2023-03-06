import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import TunesByProgram, { TunesByProgramSkeleton } from './TunesByProgram';
import { useDividedPrograms } from '../utils/useDividedArray';
import type { Program, TuneItemFragment } from '../../types';

type DisplayOnScreenProps = {
  children: React.ReactNode;
  margin?: number;
  once?: boolean;
  onSeem?: (() => void) | ((inView: boolean) => void);
};

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

type LazyViewerProps = {
  programs: (Pick<Program, 'id' | 'week' | 'date' | 'slug' | 'title' | 'subtitle'> & {
    playlist: TuneItemFragment[];
  })[];
  divisor?: number;
  filter?: (tune: TuneItemFragment) => boolean;
  onSeem?: (() => void) | ((inView: boolean) => void);
};

function LazyViewer({ programs, onSeem, filter = () => true, divisor = 15 }: LazyViewerProps) {
  const dividedItems = useDividedPrograms(programs, divisor, filter);
  const renderItems = React.useMemo(() => {
    return dividedItems.map((dividedItem, index) =>
      index === 0 ? (
        <div key={dividedItem[0].id}>
          {dividedItem.map((program) => (
            <TunesByProgram program={program} key={program?.id} />
          ))}
        </div>
      ) : (
        <DisplayOnScreen key={dividedItem[0].id} margin={40} onSeem={onSeem}>
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
