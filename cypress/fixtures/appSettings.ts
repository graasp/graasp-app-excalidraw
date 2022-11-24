import { v4 } from 'uuid';

import { AppSetting } from '@graasp/apps-query-client';

import { MOCK_SETTING_KEY } from '../../src/config/appSettingTypes';
import { DEFAULT_MOCK_SETTING } from '../../src/config/appSettings';
import { MOCK_SERVER_ITEM } from './appData';
import { CURRENT_MEMBER } from './members';

export const MOCK_GENERAL_SETTINGS: AppSetting = {
  id: v4(),
  name: MOCK_SETTING_KEY,
  data: DEFAULT_MOCK_SETTING,
  itemId: MOCK_SERVER_ITEM.id,
  creator: CURRENT_MEMBER.id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_APP_SETTINGS = [MOCK_GENERAL_SETTINGS];
