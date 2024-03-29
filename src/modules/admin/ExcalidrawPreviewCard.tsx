import { saveAs } from 'file-saver';

import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Member } from '@graasp/sdk';

import DownloadIcon from '@mui/icons-material/Download';
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';

import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from '@/config/constants';
import {
  getExcalidrawElementsFromAppData,
  getExcalidrawStateFromAppData,
  parseExcalidrawElementsAppData,
  parseExcalidrawStateAppData,
} from '@/data/excalidraw';
import blobToDataURL from '@/utils/blobToDataUrl';
import stringToColor from '@/utils/stringToColor';
import { getInitials } from '@/utils/utils';
import { exportToBlob } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';

import { useAppDataContext } from '../context/AppDataContext';
import { useSettings } from '../context/SettingsContext';

const ExcalidrawPreviewCard: FC<{
  member: Member;
}> = ({ member }) => {
  const { t } = useTranslation();

  const { appData } = useAppDataContext();
  const { drawing, exportSettings } = useSettings();
  const [thumbnail, setThumbnail] = useState<string>('');

  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const elements = parseExcalidrawElementsAppData(
      getExcalidrawElementsFromAppData(appData, member.id),
    ) as readonly ExcalidrawElement[];
    const appState = parseExcalidrawStateAppData(
      getExcalidrawStateFromAppData(appData),
    );

    const thumbnailBlob = exportToBlob({
      elements,
      appState,
      getDimensions: (w, h) => {
        const width = THUMBNAIL_WIDTH;
        const height = THUMBNAIL_HEIGHT;
        const scaleH = height / h;
        const scaleW = width / w;

        return { width, height, scale: Math.min(scaleH, scaleW) };
      },
      files: null,
    });

    thumbnailBlob.then((b) =>
      blobToDataURL(b).then((thumbnailDataUrl) =>
        setThumbnail(thumbnailDataUrl),
      ),
    );
  });

  const handleDownload: MouseEventHandler<
    HTMLButtonElement
  > = async (): Promise<void> => {
    const elements = parseExcalidrawElementsAppData(
      getExcalidrawElementsFromAppData(appData, member.id),
    ) as readonly ExcalidrawElement[];
    const appState = parseExcalidrawStateAppData(
      getExcalidrawStateFromAppData(appData),
    );

    setIsDownloading(true);
    await exportToBlob({
      elements,
      appState,
      getDimensions: (w, h) => {
        const { width, height } = exportSettings;
        const scaleH = height / h;
        const scaleW = width / w;

        return { width, height, scale: Math.min(scaleH, scaleW) };
      },
      files: null,
    }).then((b) => {
      saveAs(b, `${drawing.defaultName}.png`);
      setIsDownloading(false);
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: stringToColor(member.name) }}
            aria-label={t('EXCALIDRAW_PREV_CARD.AVATAR_ARIA', {
              name: member.name,
            })}
          >
            {getInitials(member.name)}
          </Avatar>
        }
        title={drawing.defaultName}
        subheader={t('EXCALIDRAW_PREV_CARD.SUBTITLE', { name: member.name })}
      />
      <CardMedia
        component="img"
        height="164"
        image={thumbnail}
        alt={t('EXCALIDRAW_PREV_CARD.THUMB_ALT')}
      />
      <CardActions disableSpacing>
        <Tooltip title={t('EXCALIDRAW_PREV_CARD.DOWNLOAD_BUTTON')}>
          <IconButton
            disabled={isDownloading}
            onClick={handleDownload}
            aria-label={t('EXCALIDRAW_PREV_CARD.DOWNLOAD_BUTTON')}
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ExcalidrawPreviewCard;
