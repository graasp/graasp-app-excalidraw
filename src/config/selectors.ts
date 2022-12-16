export const buildDataCy = (selector: string): string =>
  `[data-cy=${selector}]`;

export const buildTextFieldSelectorCy = (selector: string): string =>
  `${buildDataCy(selector)} input`;
