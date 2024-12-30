import * as React from "react";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@cieloazul310/gatsby-theme-aoi";
import { useDividedPrograms } from "@/utils/use-divided-array";
import type { Program, TuneItemFragment } from "types";
import TunesByProgram, { TunesByProgramSkeleton } from "./tunes-by-program";

type DisplayOnScreenProps = {
  children: React.ReactNode;
  margin?: number;
  once?: boolean;
  onSeem?: (() => void) | ((inView: boolean) => void);
};

function DisplayOnScreen({
  children,
  onSeem,
  margin = 0,
  once = true,
}: DisplayOnScreenProps) {
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
  programs: (Pick<
    Program,
    "id" | "week" | "date" | "slug" | "title" | "subtitle"
  > & {
    playlist: TuneItemFragment[];
  })[];
  divisor?: number;
  filter?: (tune: TuneItemFragment) => boolean;
  onSeem?: (() => void) | ((inView: boolean) => void);
};

function LazyViewer({
  programs,
  onSeem,
  filter = () => true,
  divisor = 15,
}: LazyViewerProps) {
  const dividedItems = useDividedPrograms(programs, divisor, filter);
  const renderItems = React.useMemo(() => {
    return dividedItems.map((dividedItem, index) => {
      if (index === 0)
        return (
          <SectionWrapper spacing={1} key={dividedItem[0].id}>
            {dividedItem.map((program) => (
              <TunesByProgram program={program} key={program?.id} />
            ))}
          </SectionWrapper>
        );
      return (
        <DisplayOnScreen key={dividedItem[0].id} margin={40} onSeem={onSeem}>
          <SectionWrapper spacing={1}>
            {dividedItem.map((program) => (
              <TunesByProgram program={program} key={program?.id} />
            ))}
          </SectionWrapper>
        </DisplayOnScreen>
      );
    });
  }, [dividedItems, onSeem]);
  return <SectionWrapper spacing={1}>{renderItems}</SectionWrapper>;
}

LazyViewer.defaultProps = {
  divisor: 15,
  filter: () => true,
  onSeem: undefined,
};

export default LazyViewer;
