import { List } from 'immutable';

import React, { FC, PropsWithChildren, createContext, useMemo } from 'react';

import { AppData } from '@graasp/apps-query-client';
import { AppDataVisibility } from '@graasp/apps-query-client/dist/config/constants';

import { MUTATION_KEYS, hooks, useMutation } from '../../config/queryClient';
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

export type AppDataContextType = {
  postAppData: (payload: PostAppDataType) => void;
  patchAppData: (payload: PatchAppDataType) => void;
  deleteAppData: (payload: DeleteAppDataType) => void;
  appDataArray: List<AppData>;
  status: { isLoading: boolean; isFetching: boolean; isPreviousData: boolean };
};

const defaultContextValue = {
  postAppData: () => null,
  patchAppData: () => null,
  deleteAppData: () => null,
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

  const contextValue: AppDataContextType = useMemo(
    () => ({
      postAppData: (payload: PostAppDataType) => {
        postAppData(payload);
      },
      patchAppData,
      deleteAppData,
      appDataArray: data || List<AppData>(),
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
