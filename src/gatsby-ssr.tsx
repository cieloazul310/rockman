import * as React from 'react';
import { RenderBodyArgs } from 'gatsby';

const HeadComponents = [
  <script
    key="1-http-ads"
    data-ad-client="ca-pub-7323207940463794"
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  />,
];

export function onRenderBody({ setHeadComponents }: RenderBodyArgs): void {
  setHeadComponents(HeadComponents);
}

export default {};
