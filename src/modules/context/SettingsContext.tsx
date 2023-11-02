import { FC, ReactElement, createContext, useContext } from 'react';

import { AppSetting } from '@graasp/sdk';

import { MUTATION_KEYS, hooks, useMutation } from '../../config/queryClient';
import Loader from '../common/Loader';

// mapping between Setting names and their data type
// eslint-disable-next-line @typescript-eslint/ban-types
type AllSettingsType = {};

// default values for the data property of settings by name
const defaultSettingsValues: AllSettingsType = {};

// list of the settings names
const ALL_SETTING_NAMES = [
  // name of your settings
] as const;

// automatically generated types
type AllSettingsNameType = (typeof ALL_SETTING_NAMES)[number];
type AllSettingsDataType = AllSettingsType[keyof AllSettingsType];

export type SettingsContextType = AllSettingsType & {
  saveSettings: (
    name: AllSettingsNameType,
    newValue: AllSettingsDataType,
  ) => void;
};

const defaultContextValue = {
  ...defaultSettingsValues,
  saveSettings: () => null,
};

const SettingsContext = createContext<SettingsContextType>(defaultContextValue);

type Prop = {
  children: ReactElement | ReactElement[];
};

export const SettingsProvider: FC<Prop> = ({ children }) => {
  const { mutate: postAppSetting } = useMutation<
    unknown,
    unknown,
    Partial<AppSetting>
  >(MUTATION_KEYS.POST_APP_SETTING);
  const { mutate: patchAppSetting } = useMutation<
    unknown,
    unknown,
    Partial<AppSetting>
  >(MUTATION_KEYS.PATCH_APP_SETTING);
  const {
    data: appSettingsList,
    isLoading,
    isSuccess,
  } = hooks.useAppSettings();

  const saveSettings = (
    name: AllSettingsNameType,
    newValue: AllSettingsDataType,
  ): void => {
    if (appSettingsList) {
      const previousSetting = appSettingsList.find((s) => s.name === name);
      // setting does not exist
      if (!previousSetting) {
        postAppSetting({
          data: newValue,
          name,
        });
      } else {
        patchAppSetting({
          id: previousSetting.id,
          data: newValue,
        });
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const getContextValue = (): SettingsContextType => {
    if (isSuccess) {
      const allSettings: AllSettingsType = ALL_SETTING_NAMES.reduce(
        <T extends AllSettingsNameType>(acc: AllSettingsType, key: T) => {
          const setting = appSettingsList.find((s) => s.name === key);
          const settingData = setting?.data;
          acc[key] = settingData as AllSettingsType[T];
          return acc;
        },
        {},
      );
      return {
        ...allSettings,
        saveSettings,
      };
    }
    return defaultContextValue;
  };

  const contextValue = getContextValue();

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType =>
  useContext<SettingsContextType>(SettingsContext);
