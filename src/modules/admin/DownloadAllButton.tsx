import saveAs from 'file-saver';
import { List } from 'immutable';
import JSZip from 'jszip';

import { FC, MouseEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DownloadIcon from '@mui/icons-material/Download';
import Fab from '@mui/material/Fab';

import { ExcalidrawElementsAppData } from '@/config/appDataTypes';
import {
  getExcalidrawElementsFromAppData,
  getExcalidrawStateFromAppData,
} from '@/data/excalidraw';
import { showErrorToast } from '@/utils/toasts';
import { exportToBlob } from '@excalidraw/excalidraw';

import { useAppDataContext } from '../context/AppDataContext';
import { useMembersContext } from '../context/MembersContext';
import { useSettings } from '../context/SettingsContext';

const zip = new JSZip();

const DownloadAllButton: FC = () => {
  const { t } = useTranslation();

  const { appData } = useAppDataContext();
  const members = useMembersContext();
  const { exportSettings } = useSettings();

  const [isDownloading, setIsDownloading] = useState(false);

  const getAllBlobs = async (
    elementsArray: List<ExcalidrawElementsAppData>,
  ): Promise<void> => {
    await Promise.all(
      elementsArray.map(async (elementsAppData) => {
        const elements = JSON.parse(elementsAppData.data.elements);
        const appStateAppData = getExcalidrawStateFromAppData(
          appData,
          elementsAppData.creator?.id,
        );
        const appState = JSON.parse(appStateAppData.data.appState);
        return exportToBlob({
          elements,
          appState,
          getDimensions: (w, h) => {
            const { width, height } = exportSettings;
            const scaleH = height / h;
            const scaleW = width / w;

            return { width, height, scale: Math.min(scaleH, scaleW) };
          },
          files: null,
        }).then((file) => zip.file(`${elementsAppData.member.id}.png`, file));
      }),
    );
  };

  const handleDownload: MouseEventHandler<
    HTMLButtonElement
  > = async (): Promise<void> => {
    if (!isDownloading) {
      setIsDownloading(true);

      const appDataElements = members.map((m) =>
        getExcalidrawElementsFromAppData(appData, m.id),
      );
      if (!appDataElements.isEmpty()) {
        getAllBlobs(appDataElements)
          .then(() => {
            zip.generateAsync({ type: 'blob' }).then((archive) => {
              const d = new Date();
              saveAs(archive, `drawings_${d.toISOString()}.zip`);
              setIsDownloading(false);
            });
          })
          .catch((reason) =>
            // eslint-disable-next-line no-console
            showErrorToast(
              t('ADMIN_VIEW.ERROR_DOWNLOAD_ALL', { reason: reason.toString() }),
            ),
          );
      }
    }
  };

  return (
    <Fab
      disabled={isDownloading}
      color="primary"
      variant="extended"
      aria-label={t('ADMIN_VIEW.DOWNLOAD_ALL_FAB_ARIA')}
      sx={{ float: 'right', mr: 1, mb: 1 }}
      onClick={handleDownload}
    >
      <DownloadIcon />
      {t('ADMIN_VIEW.DOWNLOAD_ALL_FAB')}
    </Fab>
  );
};

export default DownloadAllButton;
