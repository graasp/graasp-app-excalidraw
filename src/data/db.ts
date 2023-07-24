// We ignore this file because it is used to mock data
// when developing locally, another set of mocks is used
// when testing with cypress (defined in /cypress/fixtures/).

/* istanbul ignore file */
import type { Database, LocalContext } from '@graasp/apps-query-client';
import { Item, ItemSettings, Member, PermissionLevel } from '@graasp/sdk';

import { API_HOST } from '../config/env';

export const mockContext: LocalContext = {
  apiHost: API_HOST,
  permission: PermissionLevel.Admin,
  context: 'player',
  itemId: '1234-1234-123456-8123-123456',
  memberId: 'mock-member-id',
};

export const mockMembers: Member[] = [
  {
    id: mockContext.memberId || '',
    type: 'individual',
    name: 'current-member',
    email: 'current@graasp.org',
    updatedAt: new Date(),
    createdAt: new Date('1996-09-08T1900'),
    extra: {},
  },
  {
    id: 'mock-member-id-2',
    type: 'individual',
    name: 'mock-member-2',
    email: 'other-member@graasp.org',
    updatedAt: new Date(),
    createdAt: new Date(),
    extra: {},
  },
];

const mockItem: Item<ItemSettings> = {
  id: mockContext.itemId,
  name: 'app-brainwriting',
  description: null,
  path: '',
  settings: {},
  creator: mockMembers[0],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const buildDatabase = (
  appContext: Partial<LocalContext>,
  members?: Member[],
): Database => ({
  appData: [],
  appActions: [],
  members: members ?? mockMembers,
  appSettings: [],
  items: [mockItem],
});

export default buildDatabase;
