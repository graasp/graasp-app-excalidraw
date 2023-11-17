import { AppDataVisibility } from '@graasp/sdk';

import { APP_DATA_TYPES } from './appDataTypes';

export const PRECEDING_ELEMENT_KEY = '__precedingElement__';

export const DEFAULT_EXCALIDRAW_ELEMENTS_APP_DATA = {
  type: APP_DATA_TYPES.EXCALIDRAW_ELEMENTS,
  visibility: AppDataVisibility.Member,
  data: {
    elements: '[]',
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

export const THUMBNAIL_WIDTH = 320;
export const THUMBNAIL_HEIGHT = 200;

export const DEFAULT_EXPORT_WIDTH = 1920;
export const MAX_EXPORT_WIDTH = 10000;
export const MIN_EXPORT_WIDTH = 64;

export const DEFAULT_EXPORT_HEIGHT = 1080;
export const MAX_EXPORT_HEIGHT = 10000;
export const MIN_EXPORT_HEIGHT = 64;
