import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import HelpIcon from '@mui/icons-material/Help';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import { ADMIN_VIEW_CY } from '@/config/selectors';

import { useMembersContext } from '../context/MembersContext';
import DownloadAllButton from './DownloadAllButton';
import ExcalidrawPreviewCard from './ExcalidrawPreviewCard';

const AdminDiv = styled('div')({
  width: '100%',
});

const Admin: FC = () => {
  const { t } = useTranslation();
  const members = useMembersContext();

  const [showHelp, setShowHelp] = useState(false);
  return (
    <AdminDiv data-cy={ADMIN_VIEW_CY}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">{t('ADMIN_VIEW.TITLE')}</Typography>
        <IconButton color="primary" onClick={() => setShowHelp(!showHelp)}>
          <HelpIcon />
        </IconButton>
      </Stack>
      <Collapse in={showHelp}>
        <Alert severity="info">{t('ADMIN_VIEW.HELPER_TEXT')}</Alert>
      </Collapse>
      <Grid container spacing={1}>
        {members.map((member) => (
          <Grid key={member.id} xs={4}>
            <ExcalidrawPreviewCard member={member} />
          </Grid>
        ))}
      </Grid>
      <DownloadAllButton />
    </AdminDiv>
  );
};

export default Admin;
