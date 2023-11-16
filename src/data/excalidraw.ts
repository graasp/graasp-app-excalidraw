import { List } from 'immutable';

import { AppDataRecord } from '@graasp/sdk/frontend';

import {
  APP_DATA_TYPES,
  ExcalidrawElementsAppData,
  ExcalidrawStateAppData,
} from '@/config/appDataTypes';

export const getExcalidrawElementsFromAppData = (
  appData: List<AppDataRecord>,
  memberId?: string,
): ExcalidrawElementsAppData => {
  let d: ExcalidrawElementsAppData;
  if (memberId) {
    d = appData.find(
      ({ type, creator }) =>
        type === APP_DATA_TYPES.EXCALIDRAW_ELEMENTS && creator?.id === memberId,
    ) as ExcalidrawElementsAppData;
  } else {
    d = appData.find(
      ({ type }) => type === APP_DATA_TYPES.EXCALIDRAW_ELEMENTS,
    ) as ExcalidrawElementsAppData;
  }

  return (
    d ?? {
      type: APP_DATA_TYPES.EXCALIDRAW_ELEMENTS,
      id: '',
      data: { elements: '[]' },
    }
  );
};

export const getExcalidrawStateFromAppData = (
  appData: List<AppDataRecord>,
  memberId?: string,
): ExcalidrawStateAppData =>
  (appData.find(({ type, creator }) =>
    type === APP_DATA_TYPES.EXCALIDRAW_STATE && memberId
      ? memberId === creator?.id
      : true,
  ) as ExcalidrawStateAppData) ?? {
    type: APP_DATA_TYPES.EXCALIDRAW_STATE,
    id: '',
    data: { appState: '{}' },
  };
