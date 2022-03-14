/*
import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { HomeIcon, ProgramIcon, ArtistIcon, CategoryIcon, SelectorIcon, TakeOffIcon, TimeMachineIcon, AboutIcon } from '../../icons';
import nonNullable from '../nonNullable';
import { SiteSiteMetadata } from '../../../graphql-types';

type SiteMenu = { name: string; path: string; icon: JSX.Element };

function pathToIcon(path: string): JSX.Element {
  if (path === '/programs/') return <ProgramIcon />;
  if (path === '/artists/') return <ArtistIcon />;
  if (path === '/categories/') return <CategoryIcon />;
  if (path === '/selectors/') return <SelectorIcon />;
  if (path === '/takeoff/') return <TakeOffIcon />;
  if (path === '/timemachine/') return <TimeMachineIcon />;
  if (path === '/about/') return <AboutIcon />;
  return <HomeIcon />;
}

export default function useSiteMenu(): SiteMenu[] {
  const data = useStaticQuery<{ site: { siteMetadata: Pick<SiteSiteMetadata, 'menu'> } }>(graphql`
    query useSiteMenu {
      site {
        siteMetadata {
          menu {
            name
            path
          }
        }
      }
    }
  `);
  return React.useMemo(
    () =>
      nonNullable(data.site.siteMetadata.menu)
        .filter((menu): menu is Pick<SiteMenu, 'name' | 'path'> => Boolean(menu))
        .map((siteMenu) => ({ ...siteMenu, icon: pathToIcon(siteMenu.path) })),
    [data]
  );
}
*/
