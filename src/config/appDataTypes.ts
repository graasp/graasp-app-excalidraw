import { AppDataVisibility, S3FileItemExtra } from '@graasp/sdk';
import { AppDataRecord } from '@graasp/sdk/frontend';

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
    elements: string;
  };
  visibility?: AppDataVisibility.Item;
};

type ExcalidrawStateAppDataExtension = {
  type: APP_DATA_TYPES.EXCALIDRAW_STATE;
  data: {
    appState: string;
  };
  visibility?: AppDataVisibility.Member;
};

type ExcalidrawElementsAppData = AppDataRecord &
  ExcalidrawElementsAppDataExtension;
type ExcalidrawStateAppData = AppDataRecord & ExcalidrawStateAppDataExtension;

type s3FileData = {
  name: string;
  type: string;
  extra: {
    s3File: S3FileItemExtra;
  };
};

type FileAppData = AppDataRecord & { data: s3FileData };

export { APP_DATA_TYPES };
export type {
  ExcalidrawElementsAppData,
  ExcalidrawStateAppData,
  s3FileData,
  FileAppData,
};
