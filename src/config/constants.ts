import { AppDataVisibility } from '../types/appData';
import { APP_DATA_TYPES } from './appDataTypes';

export const PRECEDING_ELEMENT_KEY = '__precedingElement__';

export const DEFAULT_EXCALIDRAW_ELEMENTS_APP_DATA = {
  type: APP_DATA_TYPES.EXCALIDRAW_ELEMENTS,
  visibility: AppDataVisibility.ITEM,
  data: {
    elements: [],
  },
};

export const DEFAULT_EXCALIDRAW_STATE_APP_DATA = {
  type: APP_DATA_TYPES.EXCALIDRAW_STATE,
  visibility: AppDataVisibility.MEMBER,
  data: {
    appState: {},
  },
};
