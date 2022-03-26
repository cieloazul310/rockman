import * as React from 'react';
import Tab, { TabProps } from '@mui/material/Tab';

function MuiTab(props: TabProps) {
  return <Tab sx={{ textTransform: 'none' }} {...props} />;
}

export default MuiTab;
