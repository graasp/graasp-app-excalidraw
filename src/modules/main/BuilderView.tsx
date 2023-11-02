import { SyntheticEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLocalContext } from '@graasp/apps-query-client';
import { PermissionLevel } from '@graasp/sdk';

import { Paper, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { BUILDER_VIEW_CY } from '@/config/selectors';
import Excalidraw from '@/modules/excalidraw/Excalidraw';

import TabPanel from '../common/TabPanel';
import Settings from '../settings/Settings';

interface TabType {
  tabLabel: string;
  tabChild: JSX.Element;
}

const BuilderView = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { t } = useTranslation();
  const handleChange = (event: SyntheticEvent, value: number): void => {
    setSelectedTab(value);
  };
  const { permission } = useLocalContext();

  const isAdmin = useMemo(
    () => permission === PermissionLevel.Admin,
    [permission],
  );

  const activityTab = useMemo(
    () => ({
      tabLabel: t('EXCALIDRAW.TAB'),
      tabChild: <Excalidraw />,
    }),
    [t],
  );

  const settingsTab = useMemo(
    () => ({
      tabLabel: t('SETTINGS.TAB'),
      tabChild: <Settings />,
    }),
    [t],
  );

  const ideasViewTab = useMemo(
    () => ({
      tabLabel: t('ADMIN_VIEW.TAB'),
      tabChild: <p>ADMIN VIEW</p>,
    }),
    [t],
  );

  const tabs: TabType[] = useMemo(
    () => (isAdmin ? [activityTab, ideasViewTab, settingsTab] : [activityTab]),
    [isAdmin, activityTab, ideasViewTab, settingsTab],
  );

  return (
    <Stack
      data-cy={BUILDER_VIEW_CY}
      direction="row"
      spacing={2}
      width="100%"
      height="100%"
    >
      <Paper elevation={0} sx={{ width: '100%', height: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="Tabs in the builder view."
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.tabLabel} />
            ))}
          </Tabs>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={selectedTab} index={index}>
            {tab.tabChild}
          </TabPanel>
        ))}
      </Paper>
    </Stack>
  );
};

export default BuilderView;
