import { PLAYER_VIEW_CY } from '@/config/selectors';

import Excalidraw from '../excalidraw/Excalidraw';

const PlayerView = (): JSX.Element => (
  <div data-cy={PLAYER_VIEW_CY}>
    <Excalidraw />
  </div>
);

export default PlayerView;
