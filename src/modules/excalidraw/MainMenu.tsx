import { FC } from 'react';

import Divider from '@mui/material/Divider';

import { MainMenu as MainMenuExcalidraw } from '@excalidraw/excalidraw';

const MainMenu: FC = () => (
  <MainMenuExcalidraw>
    <MainMenuExcalidraw.DefaultItems.LoadScene />
    <MainMenuExcalidraw.DefaultItems.SaveAsImage />
    <MainMenuExcalidraw.DefaultItems.SaveToActiveFile />
    <MainMenuExcalidraw.DefaultItems.Export />
    <MainMenuExcalidraw.DefaultItems.ClearCanvas />
    <Divider />
    <MainMenuExcalidraw.DefaultItems.Help />
  </MainMenuExcalidraw>
);

export default MainMenu;
