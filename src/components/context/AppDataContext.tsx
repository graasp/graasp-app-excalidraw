import { List } from 'immutable';

import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
} from 'react';

import {
  Api,
  AppData,
  AppDataData,
  useLocalContext,
} from '@graasp/apps-query-client';
import { AppDataVisibility } from '@graasp/apps-query-client/dist/config/constants';

import { REACT_APP_API_HOST } from '../../config/env';
import {
  API_ROUTES,
  MUTATION_KEYS,
  hooks,
  useMutation,
} from '../../config/queryClient';
import Loader from '../common/Loader';

type PostAppDataType = {
  data: { [key: string]: unknown };
  type: string;
  visibility?: AppDataVisibility;
};

type PatchAppDataType = {
  data: { [key: string]: unknown };
  id: string;
};

type DeleteAppDataType = {
  id: string;
};

type FileUploadCompleteType = {
  id: string;
  data: AppDataData;
};

type FileToUploadType = {
  mimeType: string;
  id: string;
  dataURL: string;
  created?: number;
  lastRetrieved?: number;
};

export type AppDataContextType = {
  postAppData: (payload: PostAppDataType) => void;
  patchAppData: (payload: PatchAppDataType) => void;
  deleteAppData: (payload: DeleteAppDataType) => void;
  uploadFile: (fileToUpload: FileToUploadType) => Promise<void>;
  getFileContent: (fileId: string) => Promise<any>;
  appDataArray: List<AppData>;
  status: { isLoading: boolean; isFetching: boolean; isPreviousData: boolean };
};

const defaultContextValue = {
  postAppData: () => null,
  patchAppData: () => null,
  deleteAppData: () => null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  uploadFile: () => new Promise<void>(() => {}), // Maybe there is a better way to write this?
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getFileContent: () => new Promise<any>(() => {}),
  appDataArray: List<AppData>(),
  status: {
    isFetching: false,
    isLoading: true,
    isPreviousData: false,
  },
};

const AppDataContext = createContext<AppDataContextType>(defaultContextValue);

export const AppDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading, isFetching, isPreviousData } = hooks.useAppData();
  const { itemId } = useLocalContext();
  const { data: token } = hooks.useAuthToken(itemId);

  const { mutate: postAppData } = useMutation<
    unknown,
    unknown,
    PostAppDataType
  >(MUTATION_KEYS.POST_APP_DATA);
  const { mutate: patchAppData } = useMutation<
    unknown,
    unknown,
    PatchAppDataType
  >(MUTATION_KEYS.PATCH_APP_DATA);
  const { mutate: deleteAppData } = useMutation<
    unknown,
    unknown,
    DeleteAppDataType
  >(MUTATION_KEYS.DELETE_APP_DATA);
  const { mutate: onFileUploadComplete } = useMutation<
    unknown,
    unknown,
    FileUploadCompleteType
  >(MUTATION_KEYS.FILE_UPLOAD);

  const uploadFile = useCallback(
    async (fileToUpload: FileToUploadType): Promise<void> => {
      const { mimeType, id, dataURL } = fileToUpload;
      const xhr = new XMLHttpRequest();
      xhr.open(
        'POST',
        `${REACT_APP_API_HOST}/${API_ROUTES.buildUploadFilesRoute(itemId)}`,
        true,
      );
      xhr.setRequestHeader('authorization', `Bearer ${token}`);
      const blob = await fetch(dataURL).then((res) => res.blob());
      const file = new File([blob], id, { type: mimeType });
      const formData = new FormData();
      formData.append(id, file, id);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          console.log(`File ${id} of type ${mimeType} successfully sent!`);
          onFileUploadComplete({
            id: itemId,
            data: xhr.response?.body?.[0].filter(Boolean),
          });
        }
      };
      console.log(`Sending ${id} of type ${mimeType}...`);
      xhr.send(formData);
    },
    [itemId, onFileUploadComplete, token],
  );

  const getFileContent = useCallback(
    (fileId: string): Promise<any> => {
      const content = Api.getFileContent({
        id: fileId,
        apiHost: REACT_APP_API_HOST,
        token: token || '',
      }).then((contentData) => contentData);
      console.log('File content: ', content);
      return content;
    },
    [token],
  );

  const contextValue: AppDataContextType = useMemo(
    () => ({
      postAppData: (payload: PostAppDataType) => {
        postAppData(payload);
      },
      patchAppData,
      deleteAppData,
      appDataArray: data || List<AppData>(),
      uploadFile,
      getFileContent,
      status: {
        isFetching,
        isLoading,
        isPreviousData,
      },
    }),
    [
      data,
      deleteAppData,
      isFetching,
      isLoading,
      isPreviousData,
      patchAppData,
      postAppData,
      uploadFile,
      getFileContent,
    ],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataContext = (): AppDataContextType =>
  React.useContext<AppDataContextType>(AppDataContext);
