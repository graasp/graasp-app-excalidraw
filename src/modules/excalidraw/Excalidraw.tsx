import { List } from 'immutable';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

import { FC, useCallback, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';

import { APP_DATA_TYPES, FileAppData } from '@/config/appDataTypes';
import {
  DEFAULT_EXCALIDRAW_ELEMENTS_APP_DATA,
  DEFAULT_EXCALIDRAW_STATE_APP_DATA,
} from '@/config/constants';
import i18n from '@/config/i18n';
import {
  DEBOUNCE_COMPARE_ELEMENTS,
  DEBOUNCE_SAVE_ELEMENTS,
  DEBOUNCE_SAVE_STATE,
  EXCALIDRAW_ENABLE_GRID_MODE,
  EXCALIDRAW_ENABLE_VIEW_MODE,
  EXCALIDRAW_ENABLE_ZEN_MODE,
  EXCALIDRAW_THEME,
} from '@/config/settings';
import {
  getExcalidrawElementsFromAppData,
  getExcalidrawStateFromAppData,
} from '@/data/excalidraw';
import { getListOfFileIds, useFiles } from '@/data/files';
import Loader from '@/modules/common/Loader';
import RefreshButton from '@/modules/common/RefreshButton';
import { useAppDataContext } from '@/modules/context/AppDataContext';
import { reconcileElements } from '@/utils/reconciliation';
import { Excalidraw } from '@excalidraw/excalidraw';
import type {
  ExcalidrawElement,
  ExcalidrawImageElement,
} from '@excalidraw/excalidraw/types/element/types';
import {
  AppState,
  BinaryFiles,
  ExcalidrawImperativeAPI,
} from '@excalidraw/excalidraw/types/types';

const ExcalidrawView: FC = () => {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const lang = i18n.language;
  const date = new Date();
  const name = `drawing${date.toISOString()}`;

  const [localElements, setLocalElements] = useState<
    readonly ExcalidrawElement[]
  >([]);
  const [idElements, setIdElements] = useState<string>('');
  const [idState, setIdState] = useState<string>('');
  const [appState, setAppState] = useState<AppState>();
  const [filesAppData, setFilesAppData] = useState<List<FileAppData>>(List());
  const files = useFiles(filesAppData);

  const { appData, patchAppData, postAppData, uploadFile, deleteFile, status } =
    useAppDataContext();

  const { isLoading } = status;

  // TODO: Big effect. To be refactored.
  useEffect(() => {
    const elementsAppData = getExcalidrawElementsFromAppData(appData);

    const stateAppData = getExcalidrawStateFromAppData(appData);

    setFilesAppData(
      appData.filter(
        ({ type }) => type === APP_DATA_TYPES.FILE,
      ) as List<FileAppData>,
    );

    const { id, data: newData } = elementsAppData;
    setIdElements(id);
    const newElements = JSON.parse(newData.elements);
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
      setLocalElements(reconciledElements as readonly ExcalidrawElement[]);
    } else {
      setLocalElements(newElements);
    }
    setIdState(stateAppData.id);
    setAppState({
      ...JSON.parse(stateAppData.data.appState),
      collaborators: new Map<string, never>(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appData]);

  // TODO: check if it works
  useEffect(() => {
    excalidrawRef.current?.addFiles(files);
  }, [files]);

  // TODO: refactor
  const saveElements = (elements: string, id: string): void => {
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

  const debouncedSaveElements = useRef(
    debounce(saveElements, DEBOUNCE_SAVE_ELEMENTS),
  ).current;

  /**
   * Compare two sets of elements and only save if the elements are different than the previous elements.
   *
   * @param elements The _new_ elements.
   * @param prevElements The previous elements.
   * @param id The id of the *AppData* containing the elements.
   */
  const compareAndSaveElements = (
    elements: readonly ExcalidrawElement[],
    prevElements: readonly ExcalidrawElement[],
    id: string,
  ): void => {
    const elementsJSON = JSON.stringify(elements);
    const prevElementsJSON = JSON.stringify(prevElements);
    if (!isEqual(elementsJSON, prevElementsJSON)) {
      debouncedSaveElements(elementsJSON, id);
    }
  };

  const debouncedCompareElements = useRef(
    debounce(compareAndSaveElements, DEBOUNCE_COMPARE_ELEMENTS),
  ).current;

  /**
   * Saves Excalidraw's app state in app data.
   * @param newAppState The new AppState (from Excalidraw)
   * @param id The id of the *AppData* containing the app state.
   */
  const saveState = (newAppState: AppState, id: string): void => {
    const newAppStateJSON = JSON.stringify(newAppState);
    if (id.length > 0) {
      patchAppData({
        id,
        data: {
          appState: newAppStateJSON,
        },
      });
    } else {
      postAppData({
        ...DEFAULT_EXCALIDRAW_STATE_APP_DATA,
        data: {
          appState: newAppStateJSON,
        },
      });
    }
  };

  /**
   * Compare and save the files uploaded to excalidraw.
   * Currently not working.
   */
  const compareAndSaveFiles = useCallback(
    async (
      filesLocal: BinaryFiles,
      filesAppDataCurrent: List<FileAppData>,
      elements: ExcalidrawElement[],
    ): Promise<void> => {
      const listOfIds = getListOfFileIds(
        elements.filter(
          (element) =>
            Object.keys(element).includes('fileId') &&
            element?.isDeleted === false,
        ) as ExcalidrawImageElement[],
      );
      const listOfUploadedIds = filesAppDataCurrent.map(
        ({ data }) => data.name,
      );
      Object.values(filesLocal).forEach((file) => {
        const isUsed = listOfIds.includes(file.id);
        const isUploaded = listOfUploadedIds.includes(file.id);
        if (isUsed && !isUploaded) {
          uploadFile(file);
        } else if (!isUsed && isUploaded) {
          deleteFile(file.id);
        }
      });
    },
    [deleteFile, uploadFile],
  );

  const debouncedSaveState = useRef(
    debounce(saveState, DEBOUNCE_SAVE_STATE),
  ).current;

  const debouncedCompareAndSaveFiles = useRef(
    debounce(compareAndSaveFiles, DEBOUNCE_COMPARE_ELEMENTS),
  ).current;

  /**
   * Handle any change event.
   * @param {ExcalidrawElement[]} elements The current excalidraw elements.
   * @param {AppState} newAppState The current app state.
   * @param {BinaryFiles} filesLocal The current files.
   */
  const handleChange = (
    elements: readonly ExcalidrawElement[],
    newAppState: AppState,
    filesLocal: BinaryFiles,
  ): void => {
    const {
      isResizing,
      isRotating,
      isLoading: isExcalidrawLoading,
    } = newAppState;
    if (
      !(isExcalidrawLoading || isResizing || isRotating) &&
      typeof localElements !== 'undefined'
    ) {
      debouncedCompareElements(elements, localElements, idElements);
      if (!appState?.pendingImageElementId) {
        debouncedCompareAndSaveFiles(filesLocal, filesAppData, [...elements]);
      }
      debouncedSaveState(newAppState, idState);
    } else {
      debouncedCompareElements.cancel();
      debouncedSaveElements.cancel();
      debouncedSaveState.cancel();
      debouncedCompareAndSaveFiles.cancel();
    }
  };

  // Prevent the debounced requests from running when the component is
  // unmounted
  useEffect(() => {
    debouncedSaveElements.cancel();
    debouncedSaveState.cancel();
    debouncedCompareElements.cancel();
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box height="100%" width="100%">
      <Excalidraw
        initialData={{
          elements: localElements,
          appState,
          // files, // TODO: reimplement.
        }}
        ref={excalidrawRef}
        onChange={handleChange}
        viewModeEnabled={EXCALIDRAW_ENABLE_VIEW_MODE}
        zenModeEnabled={EXCALIDRAW_ENABLE_ZEN_MODE}
        gridModeEnabled={EXCALIDRAW_ENABLE_GRID_MODE}
        theme={EXCALIDRAW_THEME}
        name={name}
        langCode={lang}
        renderTopRightUI={() => <RefreshButton />}
      />
    </Box>
  );
};
export default ExcalidrawView;
