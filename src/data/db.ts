// We ignore this file because it is used to mock data
// when developing locally, another set of mocks is used
// when testing with cypress (defined in /cypress/fixtures/).

/* istanbul ignore file */
import type { Database, LocalContext } from '@graasp/apps-query-client';
import { PermissionLevel } from '@graasp/sdk';

import { API_HOST } from '../config/env';

export const mockContext: LocalContext = {
  apiHost: API_HOST,
  permission: PermissionLevel.Admin,
  context: 'player',
  itemId: '1234-1234-123456-8123-123456',
  memberId: 'mock-member-id',
};

// Workaround mismatch versions of SDK between direct dep and apps-query-client dep.
type Members = Database['members'];
type MockItems = Database['items'];

export const mockMembers: Members = [
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

const mockItems: MockItems = [
  {
    id: mockContext.itemId,
    name: 'app-brainwriting',
    description: null,
    path: '',
    settings: {},
    creator: mockMembers[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const buildDatabase = (
  appContext: Partial<LocalContext>,
  members?: Members,
): Database => ({
  appData: [],
  appActions: [],
  members: members ?? mockMembers,
  appSettings: [],
  items: mockItems,
});

export default buildDatabase;
