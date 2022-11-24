import { RecordOf } from 'immutable';

import React, { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Context, LocalContext } from '@graasp/apps-query-client';

import {
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';

import { APP_DATA_TYPES } from '../../../config/appDataTypes';
import { MOCK_SETTING_KEY } from '../../../config/appSettingTypes';
import { hooks } from '../../../config/queryClient';
import {
  APP_DATA_CONTAINER_CY,
  APP_SETTING_CONTAINER_CY,
  NEW_APP_DATA_BUTTON_CY,
  PLAYER_VIEW_CY,
  SETTING_NAME_FIELD_CY,
  SETTING_VALUE_FIELD_CY,
  UPDATE_APP_SETTING_BUTTON_CY,
} from '../../../config/selectors';
import { useAppDataContext } from '../../context/AppDataContext';
import { useAppSettingContext } from '../../context/AppSettingContext';
import { useMembersContext } from '../../context/MembersContext';

const SmallPre = styled('pre')(({ theme }) => ({
  fontSize: 12,
  overflow: 'scroll',
  border: '1px solid gray',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  margin: '0',
}));

const PlayerView: FC = () => {
  // use translations for the text
  const { t } = useTranslation();

  // context describes the item context, i.e. has the item id, current member id (memberId),
  // the language and current view (builder, player, ...), the current permission (admin, write, read)
  const context: RecordOf<LocalContext> = useContext(Context);
  const { data: appContext } = hooks.useAppContext();

  // get the members having access to the space
  const members = useMembersContext();

  // get the appData array and a callback to post new appData
  const { postAppData, appDataArray } = useAppDataContext();

  // get the appData array and a callback to post new appSetting
  const { patchAppSetting, postAppSetting, appSettingArray } =
    useAppSettingContext();

  const [settingValue, setSettingValue] = useState('');
  const [settingName, setSettingName] = useState(MOCK_SETTING_KEY);

  const handleAppSetting = (name: string, value: string): void => {
    const mockSetting = appSettingArray.find((s) => s.name === name);

    if (mockSetting) {
      patchAppSetting({ data: { content: value }, id: mockSetting.id });
    } else {
      postAppSetting({ data: { content: value }, name });
    }
  };

  return (
    <div data-cy={PLAYER_VIEW_CY}>
      <Stack direction="row">
        <Stack
          direction="column"
          spacing={2}
          sx={{ flex: 1, height: '100vh', p: 2 }}
        >
          <Button
            data-cy={NEW_APP_DATA_BUTTON_CY}
            onClick={() =>
              postAppData({
                data: { content: 'New Data' },
                type: APP_DATA_TYPES.MOCK_TYPE,
              })
            }
          >
            {t('New App Data')}
          </Button>
          <SmallPre data-cy={APP_DATA_CONTAINER_CY}>
            {JSON.stringify(appDataArray, undefined, 2)}
          </SmallPre>
          <Divider />
          <Stack direction="column" spacing={2}>
            <TextField
              label="Setting Name"
              data-cy={SETTING_NAME_FIELD_CY}
              value={settingName}
              onChange={(e) => setSettingName(e.target.value)}
            />
            <TextField
              label="Setting Value"
              data-cy={SETTING_VALUE_FIELD_CY}
              value={settingValue}
              onChange={(e) => setSettingValue(e.target.value)}
            />
            <Button
              data-cy={UPDATE_APP_SETTING_BUTTON_CY}
              onClick={() => handleAppSetting(settingName, settingValue)}
            >
              {t('Update Setting')}
            </Button>
          </Stack>
          <SmallPre data-cy={APP_SETTING_CONTAINER_CY}>
            {JSON.stringify(appSettingArray, undefined, 2)}
          </SmallPre>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack
          direction="column"
          sx={{
            flex: 1,
            height: '100vh',
            overflow: 'scroll',
            p: 2,
          }}
          spacing={2}
        >
          <div>
            <Typography variant="h6">{t('Local Context')}</Typography>
            <SmallPre>{JSON.stringify(context.toJS(), undefined, 2)}</SmallPre>
          </div>
          <Divider />
          <div>
            <Typography variant="h6">{t('App Context')}</Typography>
            <SmallPre>
              {JSON.stringify(appContext?.toJS(), undefined, 2)}
            </SmallPre>
          </div>
          <Divider />
          <div>
            <Typography variant="h6">{t('Members')}</Typography>
            <SmallPre>{JSON.stringify(members, undefined, 2)}</SmallPre>
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default PlayerView;
