/* eslint-disable prefer-const */
import { init } from 'i18next';

import { ImportedDataState } from '@excalidraw/excalidraw/types/data/types';

let initialData: ImportedDataState = {
  elements: [],
  appState: { viewBackgroundColor: '#AFEEEE', currentItemFontFamily: 1 },
  scrollToContent: true,
};

const getInitialData = (elements: any, state: any): ImportedDataState => {
  initialData.elements = elements;
  initialData.appState = state;
  return initialData;
};

export default getInitialData;
