import { FC, useEffect, useState } from 'react';
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
} from '@/data/excalidraw';
import stringToColor from '@/utils/stringToColor';
import { getInitials } from '@/utils/utils';
import { exportToBlob } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState } from '@excalidraw/excalidraw/types/types';

import { useAppDataContext } from '../context/AppDataContext';

const blobToDataURL = (blob: Blob): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.onabort = () => reject(new Error('Read aborted'));
    reader.readAsDataURL(blob);
  });

const ExcalidrawPreviewCard: FC<{
  member: Member;
}> = ({ member }) => {
  const { t } = useTranslation();

  const { appData } = useAppDataContext();
  const [thumbnail, setThumbnail] = useState<string>('');

  useEffect(() => {
    const elements = JSON.parse(
      getExcalidrawElementsFromAppData(appData, member.id).data.elements,
    ) as readonly ExcalidrawElement[];
    const appState = JSON.parse(
      getExcalidrawStateFromAppData(appData).data.appState,
    ) as AppState;

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
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={t('EXCALIDRAW_PREV_CARD.TITLE', { name: member.name })}
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
          <IconButton aria-label={t('EXCALIDRAW_PREV_CARD.DOWNLOAD_BUTTON')}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ExcalidrawPreviewCard;
