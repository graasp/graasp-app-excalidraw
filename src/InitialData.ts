/* eslint-disable prefer-const */
import { init } from 'i18next';

import { ImportedDataState } from '@excalidraw/excalidraw/types/data/types';

const getInitialData = (elements: any, state: any): ImportedDataState => {
  console.log(elements);
  let data: ImportedDataState = {
    elements,
    appState: state,
    scrollToContent: true,
  };
  return data;
};

export default getInitialData;
