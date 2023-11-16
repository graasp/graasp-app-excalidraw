/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@graasp/ui';

import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { hooks } from '@/config/queryClient';
import { useMembersContext } from '@/modules/context/MembersContext';
import { useSettings } from '@/modules/context/SettingsContext';

import ExportDimensions from './ExportDimensions';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingsProps {}

const Settings: FC<SettingsProps> = () => {
  const { t } = useTranslation();
  const { data: appContext } = hooks.useAppContext();
  const { saveSettings, drawing, exportSettings: eS } = useSettings();
  const members = useMembersContext();

  const [name, setName] = useState<string>(drawing.defaultName);
  const [exportSettings, setExportSettings] = useState(eS);

  const handleSave = (): void => {
    saveSettings('drawing', {
      defaultName: name,
    });
    console.log(exportSettings);
    saveSettings('exportSettings', exportSettings);
  };

  return (
    <Stack width="100%" spacing={4} direction="column">
      <Typography variant="h3" fontSize="16pt">
        {t('SETTINGS.TITLE')}
      </Typography>
      <TextField
        label={t('SETTINGS.DEFAULT_NAME_LABEL')}
        helperText={t('SETTINGS.DEFAULT_NAME_HELPER')}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Divider />
      <ExportDimensions
        onChange={(width, height) => setExportSettings({ width, height })}
      />
      <Divider />
      <Button onClick={handleSave}>{t('SETTINGS.SAVE')}</Button>
    </Stack>
  );
};

export default Settings;
