import * as React from 'react';
import { useLocation, WindowLocation } from '@reach/router';

export function withHash(title: string): string {
  return title !== '' ? `#${title}` : '';
}
export function parseHash(hash: string): string {
  const title = hash !== '' && hash.slice(0, 1) === '#' ? decodeURI(hash.slice(1)) : '';
  return title;
}

export function useParseHash<T = null>(titles: string[], stateFunction?: (state?: T | null) => string | undefined | null): number {
  const { hash, state } = useLocation() as WindowLocation<T>;
  return React.useMemo(() => {
    if (!hash && typeof state !== 'object') return 0;
    const stateTitle = typeof state === 'object' && typeof stateFunction === 'function' ? stateFunction(state) : null;
    const stateTitleIndex = stateTitle ? titles.indexOf(stateTitle) : -1;
    if (stateTitleIndex >= 0) return stateTitleIndex;
    const hashedTitle = parseHash(hash);
    const initialTabIndex = titles.indexOf(hashedTitle);
    return initialTabIndex >= 0 ? initialTabIndex : 0;
  }, []);
}

export function useHash(tab: number, titles: string[]): void {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window && typeof window === 'object') window.history.replaceState(tab, '', tab !== 0 ? withHash(titles[tab]) : pathname);
  }, [tab, titles, pathname]);
}
