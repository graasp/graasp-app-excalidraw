import { AppDataVisibility } from '@graasp/sdk';

import { APP_DATA_TYPES } from './appDataTypes';

export const PRECEDING_ELEMENT_KEY = '__precedingElement__';

export const DEFAULT_EXCALIDRAW_ELEMENTS_APP_DATA = {
  type: APP_DATA_TYPES.EXCALIDRAW_ELEMENTS,
  visibility: AppDataVisibility.Item,
  data: {
    elements: [],
  },
};

export const DEFAULT_EXCALIDRAW_STATE_APP_DATA = {
  type: APP_DATA_TYPES.EXCALIDRAW_STATE,
  visibility: AppDataVisibility.Member,
  data: {
    appState: {},
  },
};

export const ALLOWED_MIMETYPES = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/x-icon',
  'application/octet-stream',
];
