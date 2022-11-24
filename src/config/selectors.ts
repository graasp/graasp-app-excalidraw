export const PLAYER_VIEW_CY = 'player_view';
export const APP_DATA_CONTAINER_CY = 'app_data_container';
export const APP_SETTING_CONTAINER_CY = 'app_setting_container';
export const NEW_APP_DATA_BUTTON_CY = 'new_app_data_button';
export const UPDATE_APP_SETTING_BUTTON_CY = 'update_app_setting_button';
export const SETTING_NAME_FIELD_CY = 'setting_name_field';
export const SETTING_VALUE_FIELD_CY = 'setting_value_field';

export const buildDataCy = (selector: string): string =>
  `[data-cy=${selector}]`;

export const buildTextFieldSelectorCy = (selector: string): string =>
  `${buildDataCy(selector)} input`;
