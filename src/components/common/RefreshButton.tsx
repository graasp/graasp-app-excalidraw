import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useLocalContext } from '@graasp/apps-query-client';

import RefreshIcon from '@mui/icons-material/Refresh';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';

import { queryClient } from '../../config/queryClient';
import { RELOAD_BUTTON_CY } from '../../config/selectors';

const RefreshButton: FC = () => {
  const { itemId } = useLocalContext();
  const { t } = useTranslation();
  return (
    <Tooltip title={t('REFRESH')}>
      <Fab
        color="primary"
        size="small"
        onClick={() => {
          queryClient.invalidateQueries([itemId]);
        }}
        data-cy={RELOAD_BUTTON_CY}
      >
        <RefreshIcon />
      </Fab>
    </Tooltip>
  );
};

export default RefreshButton;
