import { debounce } from 'lodash';

import React, { ReactElement, useRef, useState } from 'react';

import { AppData } from '@graasp/apps-query-client';

import { Excalidraw } from '@excalidraw/excalidraw';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import {
  AppState,
  ExcalidrawImperativeAPI,
} from '@excalidraw/excalidraw/types/types';

import getInitialData from '../InitialData';
// import initialData from '../InitialData';
import { APP_DATA_VISIBILITY } from '../config/appDataTypes';
import Loader from './common/Loader';
import { useAppDataContext } from './context/AppDataContext';

const GetView = (arg: { appData: AppData }): ReactElement => {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const viewModeEnabled = false;
  const zenModeEnabled = false;
  const gridModeEnabled = false;
  const theme = 'light';
  const { patchAppData } = useAppDataContext();
  // eslint-disable-next-line react/destructuring-assignment
  const { id, data } = arg.appData;
  const iData = getInitialData(data.elements, data.state);

  const debouncedPatch = React.useRef(
    debounce((elements, state) => {
      if (excalidrawRef.current?.ready && !state.isLoading) {
        patchAppData({
          data: { elements, state },
          id,
        });
      }
    }, 5000),
  ).current;

  function handleChange(
    elements: readonly ExcalidrawElement[],
    state: AppState,
  ): void {
    debouncedPatch(elements, state);
  }

  React.useEffect(
    () => () => {
      debouncedPatch.cancel();
    },
    [debouncedPatch],
  );

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
          initialData={iData}
          onChange={(elements: readonly ExcalidrawElement[], state: AppState) =>
            handleChange(elements, state)
          }
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
  const appData = appDataArray.find(({ type }) => type === 'session');
  if (!appData) {
    console.log('posting appdata');
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
    return <Loader />;
  }
  return <GetView appData={appData} />;
};
export default LoadView;
