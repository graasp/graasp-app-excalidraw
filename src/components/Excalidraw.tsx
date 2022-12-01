import React, { ReactElement, useRef } from 'react';

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
  console.log('getting view');
  const { patchAppData } = useAppDataContext();
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const viewModeEnabled = false;
  const zenModeEnabled = false;
  const gridModeEnabled = false;
  const theme = 'light';
  // eslint-disable-next-line react/destructuring-assignment
  const { id, data } = arg.appData;
  const { elements, state } = data;
  const iData = getInitialData(elements, state);

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
          onChange={(
              elementsNew: readonly ExcalidrawElement[],
              stateNew: AppState,
            ) =>
            () => {
              console.log('patching');
              patchAppData({
                data: { elementsNew, stateNew },
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
  const appData = appDataArray.find(({ type }) => type === 'session');
  if (!appData) {
    console.log('app data:', appData);
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
    console.log(postAppData);
    return <Loader />;
  }
  return <GetView appData={appData} />;
};
export default LoadView;
