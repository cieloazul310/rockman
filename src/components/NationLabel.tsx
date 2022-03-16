import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useNationColor from '../utils/useNationColor';

type NationLabelProps = {
  nation: string;
};

function NationLabel({ nation }: NationLabelProps) {
  const { bgcolor, color } = useNationColor(nation);
  return (
    <Box sx={{ px: '.2em', py: 0, bgcolor, color }}>
      <Typography variant="caption" fontWeight="bold">
        {nation}
      </Typography>
    </Box>
  );
}

export default NationLabel;
