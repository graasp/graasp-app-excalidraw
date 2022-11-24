import { Context, PermissionLevel } from '@graasp/sdk';

import {
  APP_DATA_CONTAINER_CY,
  APP_SETTING_CONTAINER_CY,
  NEW_APP_DATA_BUTTON_CY,
  PLAYER_VIEW_CY,
  SETTING_NAME_FIELD_CY,
  SETTING_VALUE_FIELD_CY,
  UPDATE_APP_SETTING_BUTTON_CY,
  buildDataCy,
  buildTextFieldSelectorCy,
} from '../../../../src/config/selectors';
import { MOCK_APP_DATA } from '../../../fixtures/appData';
import { MOCK_APP_SETTINGS } from '../../../fixtures/appSettings';

describe('Empty App Data', () => {
  beforeEach(() => {
    cy.setUpApi({
      database: {
        appData: [],
        appSettings: MOCK_APP_SETTINGS,
      },
      appContext: {
        context: Context.PLAYER,
        permission: PermissionLevel.Read,
      },
    });
    cy.visit('/');
  });

  it('show app with no data', () => {
    // check that the player view is shown
    cy.get(buildDataCy(PLAYER_VIEW_CY)).should('be.visible');

    // check that the new app data button is present
    cy.get(buildDataCy(NEW_APP_DATA_BUTTON_CY)).should('be.visible');
    // check that the app data is empty
    cy.get(buildDataCy(APP_DATA_CONTAINER_CY)).should(
      'not.contain.text',
      '"content": "New Data"',
    );

    // add a new app data
    cy.get(buildDataCy(NEW_APP_DATA_BUTTON_CY)).click();
    cy.get(buildDataCy(APP_DATA_CONTAINER_CY)).should(
      'contain.text',
      '"content": "New Data"',
    );
  });
});

describe('Default App Data', () => {
  beforeEach(() => {
    cy.setUpApi({
      database: {
        appData: MOCK_APP_DATA,
        appSettings: MOCK_APP_SETTINGS,
      },
      appContext: {
        context: Context.PLAYER,
        permission: PermissionLevel.Read,
      },
    });
    cy.visit('/');
  });

  it('show app with default data', () => {
    // check that the player view is shown
    cy.get(buildDataCy(PLAYER_VIEW_CY)).should('be.visible');

    // check that the new app data button is present
    cy.get(buildDataCy(NEW_APP_DATA_BUTTON_CY)).should('be.visible');
    // check that the default app data are present
    cy.get(buildDataCy(APP_DATA_CONTAINER_CY)).then((elem) => {
      const text = elem[0].innerText;
      expect(JSON.parse(text)).to.deep.equal(MOCK_APP_DATA);
    });
  });
});

describe('App Settings', () => {
  beforeEach(() => {
    cy.setUpApi({
      database: {
        appData: [],
        appSettings: MOCK_APP_SETTINGS,
      },
      appContext: {
        context: Context.PLAYER,
        permission: PermissionLevel.Read,
      },
    });
    cy.visit('/');
  });

  it('should contain default setting', () => {
    // check text fields are present
    cy.get(buildTextFieldSelectorCy(SETTING_NAME_FIELD_CY)).should(
      'have.value',
      'mock_setting',
    );
    cy.get(buildTextFieldSelectorCy(SETTING_VALUE_FIELD_CY)).should(
      'have.value',
      '',
    );

    // check current value of setting
    cy.get(buildDataCy(APP_SETTING_CONTAINER_CY)).then((elem) => {
      const text = elem[0].innerText;
      expect(JSON.parse(text)).to.deep.equal(MOCK_APP_SETTINGS);
    });

    // change value of setting
    const newSettingValue = 'new value';
    cy.get(buildTextFieldSelectorCy(SETTING_VALUE_FIELD_CY)).type(
      newSettingValue,
    );
    cy.get(buildDataCy(UPDATE_APP_SETTING_BUTTON_CY)).click();

    // check that the setting has changed
    cy.get(buildDataCy(APP_SETTING_CONTAINER_CY)).then((elem) => {
      const text = elem[0].innerText;
      expect(JSON.parse(text)).to.deep.equal([
        { ...MOCK_APP_SETTINGS[0], data: { content: newSettingValue } },
      ]);
    });
  });
});
