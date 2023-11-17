import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  DEFAULT_EXPORT_HEIGHT,
  DEFAULT_EXPORT_WIDTH,
  MAX_EXPORT_WIDTH,
  MIN_EXPORT_WIDTH,
} from '@/config/constants';

import { useSettings } from '../context/SettingsContext';

interface ExportDimensionsProps {
  onChange: (width: number, height: number) => void;
}

const ExportDimensions: FC<ExportDimensionsProps> = ({ onChange }) => {
  const { t } = useTranslation();
  const { exportSettings } = useSettings();
  const [width, setWidth] = useState<number>(DEFAULT_EXPORT_WIDTH);
  const [height, setHeight] = useState<number>(DEFAULT_EXPORT_HEIGHT);

  const [errorWidth, setErrorWidth] = useState(false);
  const [errorHeight, setErrorHeight] = useState(false);

  useEffect(() => {
    setWidth(exportSettings.width);
    setHeight(exportSettings.height);
  }, [exportSettings.width, exportSettings.height]);

  const handleChange = (w: number, h: number): void => onChange(w, h);

  const handleWidthChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const w = parseInt(event.target.value, 10);
    setWidth(Number.isNaN(w) ? 0 : w);
    if (w < MAX_EXPORT_WIDTH && w > MIN_EXPORT_WIDTH) {
      handleChange(w, height);
      setErrorWidth(false);
    } else {
      setErrorWidth(true);
    }
  };

  const handleHeightChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const h = parseInt(event.target.value, 10);
    setHeight(Number.isNaN(h) ? 0 : h);
    if (h < MAX_EXPORT_WIDTH && h > MIN_EXPORT_WIDTH) {
      handleChange(width, h);
      setErrorHeight(false);
    } else {
      setErrorHeight(true);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontSize="14pt">
        {t('SETTINGS.EXPORT_HEADER')}
      </Typography>
      <TextField
        label="Width"
        value={width}
        sx={{ m: 1, width: '25ch' }}
        onChange={handleWidthChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">px</InputAdornment>,
          inputProps: { type: 'text', inputmode: 'numeric', pattern: '[0-9]*' },
        }}
        error={errorWidth}
        helperText={
          errorWidth &&
          t('SETTINGS.EXPORT_INPUT_HELPER', {
            max: MAX_EXPORT_WIDTH,
            min: MIN_EXPORT_WIDTH,
          })
        }
      />
      <TextField
        label="Height"
        value={height}
        sx={{ m: 1, width: '25ch' }}
        onChange={handleHeightChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">px</InputAdornment>,
        }}
        error={errorHeight}
        helperText={
          errorHeight &&
          t('SETTINGS.EXPORT_INPUT_HELPER', {
            max: MAX_EXPORT_WIDTH,
            min: MIN_EXPORT_WIDTH,
          })
        }
      />
    </Box>
  );
};

export default ExportDimensions;
