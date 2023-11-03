import { List } from 'immutable';

import { AppDataRecord } from '@graasp/sdk/frontend';

import {
  APP_DATA_TYPES,
  ExcalidrawElementsAppData,
  ExcalidrawStateAppData,
} from '@/config/appDataTypes';

export const getExcalidrawElementsFromAppData = (
  appData: List<AppDataRecord>,
): ExcalidrawElementsAppData =>
  (appData.find(
    ({ type }) => type === APP_DATA_TYPES.EXCALIDRAW_ELEMENTS,
  ) as ExcalidrawElementsAppData) ?? {
    type: APP_DATA_TYPES.EXCALIDRAW_ELEMENTS,
    id: '',
    data: { elements: '[]' },
  };

export const getExcalidrawStateFromAppData = (
  appData: List<AppDataRecord>,
): ExcalidrawStateAppData =>
  (appData.find(
    ({ type }) => type === APP_DATA_TYPES.EXCALIDRAW_STATE,
  ) as ExcalidrawStateAppData) ?? {
    type: APP_DATA_TYPES.EXCALIDRAW_STATE,
    id: '',
    data: { appState: '{}' },
  };
