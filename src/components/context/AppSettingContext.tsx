import { List } from 'immutable';

import React, { FC, PropsWithChildren, createContext, useMemo } from 'react';

import { AppSetting } from '@graasp/apps-query-client';

import { MUTATION_KEYS, hooks, useMutation } from '../../config/queryClient';
import Loader from '../common/Loader';

type PostAppSettingType = {
  data: { [key: string]: unknown };
  name: string;
};

type PatchAppSettingType = {
  data: { [key: string]: unknown };
  id: string;
};

type DeleteAppSettingType = {
  id: string;
};

export type AppSettingContextType = {
  postAppSetting: (payload: PostAppSettingType) => void;
  patchAppSetting: (payload: PatchAppSettingType) => void;
  deleteAppSetting: (payload: DeleteAppSettingType) => void;
  appSettingArray: List<AppSetting>;
};

const defaultContextValue = {
  postAppSetting: () => null,
  patchAppSetting: () => null,
  deleteAppSetting: () => null,
  appSettingArray: List<AppSetting>(),
};

const AppSettingContext =
  createContext<AppSettingContextType>(defaultContextValue);

export const AppSettingProvider: FC<PropsWithChildren> = ({ children }) => {
  const appSetting = hooks.useAppSettings();

  const { mutate: postAppSetting } = useMutation<
    unknown,
    unknown,
    PostAppSettingType
  >(MUTATION_KEYS.POST_APP_SETTING);
  const { mutate: patchAppSetting } = useMutation<
    unknown,
    unknown,
    PatchAppSettingType
  >(MUTATION_KEYS.PATCH_APP_SETTING);
  const { mutate: deleteAppSetting } = useMutation<
    unknown,
    unknown,
    DeleteAppSettingType
  >(MUTATION_KEYS.DELETE_APP_SETTING);

  const contextValue: AppSettingContextType = useMemo(
    () => ({
      postAppSetting,
      patchAppSetting,
      deleteAppSetting,
      appSettingArray: appSetting.data || List<AppSetting>(),
    }),
    [appSetting.data, deleteAppSetting, patchAppSetting, postAppSetting],
  );

  if (appSetting.isLoading) {
    return <Loader />;
  }

  return (
    <AppSettingContext.Provider value={contextValue}>
      {children}
    </AppSettingContext.Provider>
  );
};

export const useAppSettingContext = (): AppSettingContextType =>
  React.useContext<AppSettingContextType>(AppSettingContext);
