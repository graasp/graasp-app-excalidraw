import Paper from '@mui/material/Paper';

import { PLAYER_VIEW_CY } from '@/config/selectors';

import Excalidraw from '../excalidraw/Excalidraw';

const PlayerView = (): JSX.Element => (
  <Paper
    elevation={0}
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
    data-cy={PLAYER_VIEW_CY}
  >
    <Excalidraw />
  </Paper>
);

export default PlayerView;
