import * as React from 'react';
import { RenderBodyArgs } from 'gatsby';

const HeadComponents = [
  <script
    key="1-http-ads"
    data-ad-client="ca-pub-7323207940463794"
    async
    crossOrigin="anonymous"
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7323207940463794"
  />,
];

// eslint-disable-next-line import/prefer-default-export
export function onRenderBody({ setHeadComponents }: RenderBodyArgs) {
  setHeadComponents(HeadComponents);
}
