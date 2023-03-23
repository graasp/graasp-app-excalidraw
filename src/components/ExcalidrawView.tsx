import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

import { FC, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';

import { Excalidraw } from '@excalidraw/excalidraw';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import {
  AppState,
  ExcalidrawImperativeAPI,
} from '@excalidraw/excalidraw/types/types';

import {
  APP_DATA_TYPES,
  ExcalidrawElementsAppData,
  ExcalidrawStateAppData,
} from '../config/appDataTypes';
import {
  DEFAULT_EXCALIDRAW_ELEMENTS_APP_DATA,
  DEFAULT_EXCALIDRAW_STATE_APP_DATA,
} from '../config/constants';
import i18n from '../config/i18n';
import {
  DEBOUNCE_COMPARE_ELEMENTS,
  DEBOUNCE_SAVE_ELEMENTS,
  DEBOUNCE_SAVE_STATE,
  EXCALIDRAW_ENABLE_GRID_MODE,
  EXCALIDRAW_ENABLE_VIEW_MODE,
  EXCALIDRAW_ENABLE_ZEN_MODE,
  EXCALIDRAW_THEME,
} from '../config/settings';
import { reconcileElements } from '../utils/reconciliation';
import { useAppDataContext } from './context/AppDataContext';

const ExcalidrawView: FC = () => {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const lang = i18n.language;
  const date = new Date();
  const name = `drawing${date.toISOString()}`;

  const [localElements, setLocalElements] =
    useState<readonly ExcalidrawElement[]>();
  const [idElements, setIdElements] = useState<string>('');
  const [idState, setIdState] = useState<string>('');
  const [appState, setAppState] = useState<AppState>();

  const { appDataArray, patchAppData, postAppData } = useAppDataContext();

  useEffect(() => {
    const elementsAppData: ExcalidrawElementsAppData = (appDataArray.find(
      ({ type }) => type === APP_DATA_TYPES.EXCALIDRAW_ELEMENTS,
    ) as ExcalidrawElementsAppData) ?? {
      type: APP_DATA_TYPES.EXCALIDRAW_ELEMENTS,
      id: '',
      data: { elements: [] },
    };

    const stateAppData: ExcalidrawStateAppData = (appDataArray.find(
      ({ type }) => type === APP_DATA_TYPES.EXCALIDRAW_STATE,
    ) as ExcalidrawStateAppData) ?? {
      type: APP_DATA_TYPES.EXCALIDRAW_STATE,
      id: '',
      data: { appState: {} },
    };
    const { id, data: newData } = elementsAppData;
    setIdElements(id);
    const { elements: newElements } = newData;
    if (excalidrawRef.current && typeof localElements !== 'undefined') {
      const reconciledElements = reconcileElements(
        localElements,
        newElements,
        excalidrawRef.current.getAppState(),
      );
      excalidrawRef.current.updateScene({
        elements: reconciledElements,
        commitToHistory: false,
      });
      setLocalElements(reconciledElements);
    } else {
      setLocalElements(newElements);
    }
    setIdState(stateAppData.id);
    setAppState({
      ...stateAppData.data.appState,
      collaborators: new Map<string, never>(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appDataArray]);

  const saveElements = (
    elements: readonly ExcalidrawElement[],
    id: string,
  ): void => {
    if (id.length > 0) {
      patchAppData({
        id,
        data: {
          elements,
        },
      });
    } else {
      postAppData({
        ...DEFAULT_EXCALIDRAW_ELEMENTS_APP_DATA,
        data: {
          elements,
        },
      });
    }
  };

  const saveState = (newAppState: AppState, id: string): void => {
    if (id.length > 0) {
      patchAppData({
        id,
        data: {
          appState: newAppState,
        },
      });
    } else {
      postAppData({
        ...DEFAULT_EXCALIDRAW_STATE_APP_DATA,
        data: {
          appState: newAppState,
        },
      });
    }
  };

  const debouncedSaveElements = useRef(
    debounce(saveElements, DEBOUNCE_SAVE_ELEMENTS),
  ).current;

  const compareAndSaveElements = (
    elements: readonly ExcalidrawElement[],
    prevElements: readonly ExcalidrawElement[],
    id: string,
  ): void => {
    if (!isEqual(elements, prevElements)) {
      debouncedSaveElements(elements, id);
    }
  };

  const debouncedCompareElements = useRef(
    debounce(compareAndSaveElements, DEBOUNCE_COMPARE_ELEMENTS),
  ).current;

  const debouncedSaveState = useRef(
    debounce(saveState, DEBOUNCE_SAVE_STATE),
  ).current;

  const handleChange = (
    elements: readonly ExcalidrawElement[],
    newAppState: AppState,
  ): void => {
    const { isResizing, isRotating, isLoading } = newAppState;
    if (
      !(isLoading || isResizing || isRotating) &&
      typeof localElements !== 'undefined'
    ) {
      debouncedCompareElements(elements, localElements, idElements);
      debouncedSaveState(newAppState, idState);
    } else {
      debouncedCompareElements.cancel();
      debouncedSaveElements.cancel();
      debouncedSaveState.cancel();
    }
  };

  // Prevent the debounced requests from running when the component is
  // unmounted
  useEffect(() => {
    debouncedSaveElements.cancel();
    debouncedSaveState.cancel();
    debouncedCompareElements.cancel();
  });

  return (
    <Box height="100vh" width="100%">
      <Excalidraw
        initialData={{ elements: localElements, appState }}
        ref={excalidrawRef}
        onChange={handleChange}
        viewModeEnabled={EXCALIDRAW_ENABLE_VIEW_MODE}
        zenModeEnabled={EXCALIDRAW_ENABLE_ZEN_MODE}
        gridModeEnabled={EXCALIDRAW_ENABLE_GRID_MODE}
        theme={EXCALIDRAW_THEME}
        name={name}
        langCode={lang}
      />
    </Box>
  );
};
export default ExcalidrawView;
