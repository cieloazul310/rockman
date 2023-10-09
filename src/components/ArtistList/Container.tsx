import * as React from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import ArtistListItem from "./Item";
import type { ArtistListItem as ArtistListItemType } from "../../../types";

function renderRow({
  index,
  style,
  data,
}: ListChildComponentProps<ArtistListItemType[]>) {
  const node = data[index];
  return <ArtistListItem style={style} key={index} data={node} />;
}

type ArtistListProps = {
  artists: ArtistListItemType[];
  width?: number;
  height?: number;
  itemSize?: number;
};

function ArtistList({
  artists,
  width = 320,
  height = 480,
  itemSize = 60,
}: ArtistListProps) {
  return (
    <FixedSizeList
      width={width}
      height={height}
      itemCount={artists.length}
      itemSize={itemSize}
      itemData={artists}
    >
      {renderRow}
    </FixedSizeList>
  );
}

ArtistList.defaultProps = {
  width: 320,
  height: 480,
  itemSize: 60,
};

export default ArtistList;
