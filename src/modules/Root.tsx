import { SnackbarProvider } from 'notistack';

import React, { FC } from 'react';
import { I18nextProvider } from 'react-i18next';

import { withContext, withToken } from '@graasp/apps-query-client';

import { CssBaseline, ThemeProvider, createTheme, styled } from '@mui/material';
import { grey, orange, pink } from '@mui/material/colors';
import { StyledEngineProvider } from '@mui/material/styles';

import i18nConfig from '../config/i18n';
import {
  CONTEXT_FETCHING_ERROR_MESSAGE,
  TOKEN_REQUEST_ERROR_MESSAGE,
} from '../config/messages';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  hooks,
  queryClient,
} from '../config/queryClient';
import { showErrorToast } from '../utils/toasts';
import Loader from './common/Loader';
import App from './main/App';

// declare the module to enable theme modification
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: { background: string; color: string };
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: { background: string; color: string };
    };
  }

  interface PaletteOptions {
    default: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#5050d2',
    },
    secondary: pink,
    default: grey['500'],
    background: {
      paper: '#fff',
    },
  },
  status: {
    danger: {
      background: orange['400'],
      color: '#fff',
    },
  },
});

const RootDiv = styled('div')({
  flexGrow: 1,
  height: window.innerHeight,
});

const Root: FC = () => {
  const AppWithContext = withToken(App, {
    LoadingComponent: <Loader />,
    useAuthToken: hooks.useAuthToken,
    onError:
      /* istanbul ignore next */
      () => {
        showErrorToast(TOKEN_REQUEST_ERROR_MESSAGE);
      },
  });
  const AppWithContextAndToken = withContext(AppWithContext, {
    LoadingComponent: <Loader />,
    useGetLocalContext: hooks.useGetLocalContext,
    // do not use because this will collapse the view
    useAutoResize: hooks.useAutoResize,
    onError:
      /* istanbul ignore next */
      () => {
        showErrorToast(CONTEXT_FETCHING_ERROR_MESSAGE);
      },
  });
  return (
    <RootDiv>
      {/* Used to define the order of injected properties between JSS and emotion */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <I18nextProvider i18n={i18nConfig}>
            <SnackbarProvider>
              <QueryClientProvider client={queryClient}>
                <AppWithContextAndToken />
                {process.env.NODE_ENV === 'development' && (
                  <ReactQueryDevtools />
                )}
              </QueryClientProvider>
            </SnackbarProvider>
          </I18nextProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </RootDiv>
  );
};

export default Root;
