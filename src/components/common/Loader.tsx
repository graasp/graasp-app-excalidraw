import React, { FC } from 'react';

import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loader: FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <CircularProgress />
  </Box>
);

export default Loader;
