export const buildDataCy = (selector: string): string =>
  `[data-cy=${selector}]`;

export const buildTextFieldSelectorCy = (selector: string): string =>
  `${buildDataCy(selector)} input`;

export const RELOAD_BUTTON_CY = 'reloadButton';
export const PLAYER_VIEW_CY = 'playerView';
export const BUILDER_VIEW_CY = 'builderView';
export const ANALYTICS_VIEW_CY = 'analyticsView';
export const ADMIN_VIEW_CY = 'adminView';
