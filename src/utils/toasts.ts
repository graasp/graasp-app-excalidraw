import { enqueueSnackbar } from 'notistack';

const showErrorToast = (message: string): void => {
  enqueueSnackbar(message, { variant: 'error' });
};
const showWarningToast = (message: string): void => {
  enqueueSnackbar(message, { variant: 'warning' });
};

// eslint-disable-next-line import/prefer-default-export
export { showErrorToast, showWarningToast };
