/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@graasp/ui';

import { Stack, Typography } from '@mui/material';

import { hooks } from '@/config/queryClient';
import { useMembersContext } from '@/modules/context/MembersContext';
import { useSettings } from '@/modules/context/SettingsContext';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingsProps {}

const Settings: FC<SettingsProps> = () => {
  const { t } = useTranslation();
  const { data: appContext } = hooks.useAppContext();
  const { saveSettings } = useSettings();
  const members = useMembersContext();

  const handleSave = (): void => {
    // saveSettings('prompt', {
    //   content: promptContent,
    //   type: 'plain-text',
    // });
    // saveSettings('orchestrator', {
    //   id: orchestratorId || '',
    // });
    // saveSettings('mode', {
    //   mode: modeState,
    // });
  };

  return (
    <Stack width="100%" spacing={4} direction="column">
      <Typography variant="h3" fontSize="16pt">
        {t('SETTINGS.TITLE')}
      </Typography>
      <Button onClick={handleSave}>{t('SETTINGS.SAVE')}</Button>
    </Stack>
  );
};

export default Settings;
