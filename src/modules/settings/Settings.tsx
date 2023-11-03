/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@graasp/ui';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { hooks } from '@/config/queryClient';
import { useMembersContext } from '@/modules/context/MembersContext';
import { useSettings } from '@/modules/context/SettingsContext';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingsProps {}

const Settings: FC<SettingsProps> = () => {
  const { t } = useTranslation();
  const { data: appContext } = hooks.useAppContext();
  const { saveSettings, drawing } = useSettings();
  const members = useMembersContext();

  const [name, setName] = useState<string>(drawing.name);

  const handleSave = (): void => {
    saveSettings('drawing', {
      ...drawing,
      name,
    });
  };

  return (
    <Stack width="100%" spacing={4} direction="column">
      <Typography variant="h3" fontSize="16pt">
        {t('SETTINGS.TITLE')}
      </Typography>
      <TextField value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={handleSave}>{t('SETTINGS.SAVE')}</Button>
    </Stack>
  );
};

export default Settings;
