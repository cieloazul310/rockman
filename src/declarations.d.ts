import type { SwipeableViewsProps as OriginalSwipeableViewsProps } from 'react-swipeable-views';

declare const graphql: (query: TemplateStringsArray) => void;

declare module 'react-swipeable-views' {
  export interface SwipeableViewsProps extends OriginalSwipeableViewsProps {
    action?: ({ updateHeight }: { updateHeight: () => void }) => void;
  }
}
