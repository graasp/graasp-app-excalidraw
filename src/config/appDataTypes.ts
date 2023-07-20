import { AppData } from '@graasp/apps-query-client';
import { AppDataVisibility } from '@graasp/apps-query-client/dist/config/constants';
import { S3FileItemExtra } from '@graasp/sdk';

import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState } from '@excalidraw/excalidraw/types/types';

/* eslint-disable no-shadow */
enum APP_DATA_TYPES {
  MOCK_TYPE = 'mock_type',
  SESSION_TYPE = 'session',
  EXCALIDRAW_ELEMENTS = 'excalidraw_elements',
  EXCALIDRAW_STATE = 'excalidraw_state',
  FILE = 'file',
}

type ExcalidrawElementsAppDataExtension = {
  type: APP_DATA_TYPES.EXCALIDRAW_ELEMENTS;
  data: {
    elements: ExcalidrawElement[];
  };
  visibility?: AppDataVisibility.ITEM;
};

type ExcalidrawStateAppDataExtension = {
  type: APP_DATA_TYPES.EXCALIDRAW_STATE;
  data: {
    appState: AppState;
  };
  visibility?: AppDataVisibility.MEMBER;
};

type ExcalidrawElementsAppData = AppData & ExcalidrawElementsAppDataExtension;
type ExcalidrawStateAppData = AppData & ExcalidrawStateAppDataExtension;

type s3FileData = {
  name: string;
  type: string;
  extra: {
    s3File: S3FileItemExtra;
  };
};

type FileAppData = AppData & { data: s3FileData };

export { APP_DATA_TYPES };
export type {
  ExcalidrawElementsAppData,
  ExcalidrawStateAppData,
  s3FileData,
  FileAppData,
};
