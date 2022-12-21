import debounce from 'lodash.debounce';

import { FC, useEffect, useRef } from 'react';

import { AppData } from '@graasp/apps-query-client';

import { Box } from '@mui/material';

import { Excalidraw } from '@excalidraw/excalidraw';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import {
  AppState,
  ExcalidrawImperativeAPI,
} from '@excalidraw/excalidraw/types/types';

import { DEBOUNCE_VALUE } from '../config/settings';
import getInitialData from './InitialData';
import { useAppDataContext } from './context/AppDataContext';

type Props = {
  appData: AppData;
};

const ExcalidrawView: FC<Props> = ({ appData }) => {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const viewModeEnabled = false;
  const zenModeEnabled = false;
  const gridModeEnabled = false;
  const theme = 'light';
  const { patchAppData } = useAppDataContext();
  // eslint-disable-next-line react/destructuring-assignment
  const { id, data } = appData;
  const iData = getInitialData(
    data.elements as readonly ExcalidrawElement[],
    // data.state as AppState,
  );

  const debouncedPatch = useRef(
    debounce((elements, state) => {
      if (excalidrawRef.current?.ready && !state.isLoading) {
        patchAppData({
          data: { elements, state },
          id,
        });
      }
    }, DEBOUNCE_VALUE),
  ).current;

  function handleChange(
    elements: readonly ExcalidrawElement[],
    state: AppState,
  ): void {
    // eslint-disable-next-line no-console
    console.log('handling changes');
    debouncedPatch(elements, state);
  }

  useEffect(
    () => () => {
      debouncedPatch.cancel();
    },
    [debouncedPatch],
  );

  const date = new Date();
  const name = `drawing${date.toISOString()}`;
  return (
    <Box height="100vh" width="100%">
      <Excalidraw
        ref={excalidrawRef}
        initialData={iData}
        onChange={(elements: readonly ExcalidrawElement[], state: AppState) =>
          handleChange(elements, state)
        }
        viewModeEnabled={viewModeEnabled}
        zenModeEnabled={zenModeEnabled}
        gridModeEnabled={gridModeEnabled}
        theme={theme}
        name={name}
      />
    </Box>
  );
};
export default ExcalidrawView;
