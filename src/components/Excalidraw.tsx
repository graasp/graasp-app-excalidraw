import { debounce } from 'lodash';

import React, { ReactElement, useRef } from 'react';

import { AppData } from '@graasp/apps-query-client';

import { Excalidraw } from '@excalidraw/excalidraw';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import {
  AppState,
  ExcalidrawImperativeAPI,
} from '@excalidraw/excalidraw/types/types';

import { APP_DATA_TYPES, APP_DATA_VISIBILITY } from '../config/appDataTypes';
import {
  CURRENT_ITEM_FONT_FAMILY,
  DEBOUNCE_VALE,
  VIEW_BACKGROUND_COLOR,
} from '../config/settings';
import getInitialData from './InitialData';
import Loader from './common/Loader';
import { useAppDataContext } from './context/AppDataContext';

const GetView = (prop: { appData: AppData }): ReactElement => {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const viewModeEnabled = false;
  const zenModeEnabled = false;
  const gridModeEnabled = false;
  const theme = 'light';
  const { patchAppData } = useAppDataContext();
  // eslint-disable-next-line react/destructuring-assignment
  const { id, data } = prop.appData;
  const iData = getInitialData(data.elements, data.state);

  const debouncedPatch = React.useRef(
    debounce((elements, state) => {
      if (excalidrawRef.current?.ready && !state.isLoading) {
        patchAppData({
          data: { elements, state },
          id,
        });
      }
    }, DEBOUNCE_VALE),
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

  const date = new Date();
  const name = `darwing${date.toISOString()}`;
  return (
    <div className="App">
      <div
        className="excalidraw-wrapper"
        style={{
          height: '100%',
          width: '100%',
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
          name={name}
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
    postAppData({
      data: {
        elements: [],
        state: {
          viewBackgroundColor: VIEW_BACKGROUND_COLOR,
          currentItemFontFamily: CURRENT_ITEM_FONT_FAMILY,
        },
      },
      type: APP_DATA_TYPES.SESSION_TYPE,
      visibility: APP_DATA_VISIBILITY.MEMBER,
    });
    return <Loader />;
  }
  return <GetView appData={appData} />;
};
export default LoadView;
