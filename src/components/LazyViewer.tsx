import * as React from 'react';
import TunesByProgram from './TunesByProgram';
import { TuneCardSkeleton } from './TuneCard';
import useOnScreen from '../utils/useOnScreen';
import { useDividedPrograms } from '../utils/useDividedArray';
import { Program, ProgramPlaylist } from '../../graphql-types';

function DummyItem() {
  return (
    <div>
      <TuneCardSkeleton />
    </div>
  );
}

interface DisplayOnScreenProps {
  children: JSX.Element | JSX.Element[];
  margin?: number;
  once?: boolean;
}

function DisplayOnScreen({
  children,
  margin,
  once = true,
}: DisplayOnScreenProps) {
  const ref = React.useRef();
  const onScreen = useOnScreen(ref, margin);
  return <div ref={ref}>{onScreen ? children : <DummyItem />}</div>;
}

interface Props {
  programs: Program[];
  divisor?: number;
  filter?: (tune: ProgramPlaylist) => boolean;
}

function LazyViewer({ programs, filter, divisor = 15 }: Props) {
  const dividedItems = useDividedPrograms(programs, divisor, filter);
  console.log(dividedItems);
  const renderItems = React.useMemo(() => {
    return dividedItems.map((d, i) =>
      i === 0 ? (
        <div key={i}>
          {d.map((v, index) => (
            <TunesByProgram program={v} key={v.id} />
          ))}
        </div>
      ) : (
        <DisplayOnScreen key={i} margin={-40}>
          {d.map((v, index) => (
            <TunesByProgram program={v} key={v.id} />
          ))}
        </DisplayOnScreen>
      )
    );
  }, [programs, divisor]);
  return <div>{renderItems}</div>;
}

export default LazyViewer;
