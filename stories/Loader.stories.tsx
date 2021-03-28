import * as React from 'react';
import Box from '@material-ui/core/Box';
import Loader from '../src/components/Loader';

const stories = { title: 'loader' };
export default stories;

export function Basic(): JSX.Element {
  return (
    <div>
      <Box py={2}>
        <Box width={200} height={200} border="solid 1px gray">
          <Loader height={200} />
        </Box>
      </Box>
      <Box py={2}>
        <Box width={400} height={120} bgcolor="background.paper">
          <Loader height={120} />
        </Box>
      </Box>
      <Box py={2}>
        <Box width={100} height={600}>
          <Loader height={600} />
        </Box>
      </Box>
    </div>
  );
}
