import { ImportedDataState } from '@excalidraw/excalidraw/types/data/types';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState } from '@excalidraw/excalidraw/types/types';

const getInitialData = (
  elements: readonly ExcalidrawElement[],
  // state: AppState,
): ImportedDataState => {
  const data: ImportedDataState = {
    elements,
    // appState: state,
    scrollToContent: true,
  };
  return data;
};

export default getInitialData;
