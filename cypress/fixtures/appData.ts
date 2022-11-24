import { v4 as uuid } from 'uuid';

import { AppData } from '@graasp/apps-query-client';

import { APP_DATA_TYPES } from '../../src/config/appDataTypes';
import { CURRENT_MEMBER, MEMBERS } from './members';

export const MOCK_SERVER_ITEM = { id: '1234567890' };

export const MOCK_SERVER_API_HOST = 'http://localhost:3636';

export const MOCK_APP_DATA: AppData[] = [
  {
    id: uuid(),
    data: {
      content: 'An app data',
    },
    memberId: CURRENT_MEMBER.id,
    creator: MEMBERS.BOB.id,
    itemId: MOCK_SERVER_ITEM.id,
    createdAt: new Date('2020-01-01').toISOString(),
    updatedAt: new Date('2020-01-01').toISOString(),
    type: APP_DATA_TYPES.MOCK_TYPE,
  },
];
