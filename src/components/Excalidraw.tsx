import React, { ReactElement, useRef } from 'react';

import { AppData } from '@graasp/apps-query-client';

import { Excalidraw } from '@excalidraw/excalidraw';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import {
  AppState,
  ExcalidrawImperativeAPI,
} from '@excalidraw/excalidraw/types/types';

import initialData from '../InitialData';
import { APP_DATA_VISIBILITY } from '../config/appDataTypes';
import { useAppDataContext } from './context/AppDataContext';

const GetView = (data: AppData): ReactElement => {
  const { patchAppData } = useAppDataContext();
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const viewModeEnabled = false;
  const zenModeEnabled = false;
  const gridModeEnabled = false;
  const theme = 'light';
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = data;

  return (
    <div className="App">
      <div
        className="excalidraw-wrapper"
        style={{
          height: '800px',
        }}
      >
        <Excalidraw
          ref={excalidrawRef}
          initialData={initialData}
          onChange={(elements: readonly ExcalidrawElement[], state: AppState) =>
            () => {
              patchAppData({
                data: { elements, state },
                id,
              });
            }}
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
          theme={theme}
          name="Custom name of drawing"
        />
      </div>
    </div>
  );
};
const LoadView = (): ReactElement => {
  const { postAppData, appDataArray } = useAppDataContext();
  // get if empty send empty and create else send new vals
  if (appDataArray.isEmpty()) {
    postAppData({
      data: {
        elements: [],
        state: {
          viewBackgroundColor: '#AFEEEE',
          currentItemFontFamily: 1,
        },
      },
      type: 'session',
      visibility: APP_DATA_VISIBILITY.MEMBER,
    });
  }
  const appData = appDataArray.find(({ type }) => type === 'session');
  if (appData) return GetView(appData);
  return LoadView();
};
export default LoadView;
