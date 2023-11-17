import { List } from 'immutable';

import { AppDataRecord } from '@graasp/sdk/frontend';

import {
  APP_DATA_TYPES,
  ExcalidrawElementsAppData,
  ExcalidrawStateAppData,
} from '@/config/appDataTypes';
import { showErrorToast } from '@/utils/toasts';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState } from '@excalidraw/excalidraw/types/types';

export const parseExcalidrawElementsAppData = (
  elementsAppData: ExcalidrawElementsAppData,
): readonly ExcalidrawElement[] => {
  try {
    return JSON.parse(
      elementsAppData.data.elements,
    ) as readonly ExcalidrawElement[];
  } catch (error) {
    if (typeof error === 'string') {
      showErrorToast(error.toString());
    }
  }
  return [];
};

export const parseExcalidrawStateAppData = (
  stateAppData: ExcalidrawStateAppData,
  // eslint-disable-next-line consistent-return
): AppState | undefined => {
  try {
    return JSON.parse(stateAppData.data.appState) as AppState;
  } catch (error) {
    if (typeof error === 'string') {
      showErrorToast(error.toString());
    }
  }
};

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
  (appData.find(
    ({ type, creator }) =>
      type === APP_DATA_TYPES.EXCALIDRAW_STATE &&
      (memberId ? memberId === creator?.id : true),
  ) as ExcalidrawStateAppData) ?? {
    type: APP_DATA_TYPES.EXCALIDRAW_STATE,
    id: '',
    data: { appState: '{}' },
  };
