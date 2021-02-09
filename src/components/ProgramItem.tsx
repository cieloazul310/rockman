import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItemLink from 'gatsby-theme-aoi/src/components/ListItemLink';
import { Maybe, Program } from '../../graphql-types';

interface Props {
  program: Maybe<Pick<Program, 'fields' | 'title' | 'week' | 'date'>>;
}

function ProgramItem({ program }: Props) {
  return (
    <ListItemLink
      avatar={<Avatar src={program?.fields?.image ?? undefined} variant="square" />}
      to={program?.fields?.slug ?? '#'}
      primaryText={program?.title ?? 'タイトル'}
      secondaryText={`第${program?.week}回 ${program?.date}`}
      divider
    />
  );
}

export default ProgramItem;
