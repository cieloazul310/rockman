import * as React from 'react';
import Box from '@material-ui/core/Box';
import TunesByProgram from './TunesByProgram';
import { TuneCardSkeleton } from './TuneCard';
import useOnScreen from '../utils/useOnScreen';
import { useDividedPrograms } from '../utils/useDividedArray';
import { QueriedProgram } from '../types';
import { ProgramPlaylist } from '../../graphql-types';

function DummyItem() {
  return (
    <Box py={4}>
      <TuneCardSkeleton />
    </Box>
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
  programs: QueriedProgram[];
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
          {d.map(v => (
            <TunesByProgram program={v} key={v.id} />
          ))}
        </div>
      ) : (
        <DisplayOnScreen key={i} margin={40}>
          {d.map(v => (
            <TunesByProgram program={v} key={v.id} />
          ))}
        </DisplayOnScreen>
      )
    );
  }, [dividedItems]);
  return <div>{renderItems}</div>;
}

export default LazyViewer;
