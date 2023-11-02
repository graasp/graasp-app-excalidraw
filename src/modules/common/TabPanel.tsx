import { styled } from '@mui/material';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanelDiv = styled('div')({
  height: '100%',
});

const TabPanel = (props: TabPanelProps): JSX.Element => {
  const { children, value, index, ...other } = props;

  return (
    <TabPanelDiv
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {/* TODO: Fix height problem with tabs. */}
      {value === index && <Box sx={{ height: '100%' }}>{children}</Box>}
    </TabPanelDiv>
  );
};

export default TabPanel;
