import { useEffect } from 'react';

import { useLocalContext } from '@graasp/apps-query-client';
import { Context, DEFAULT_LANG } from '@graasp/sdk';

import { SENTRY_ENV } from '@/config/env';
import { hooks } from '@/config/queryClient';
import * as Sentry from '@sentry/react';

import i18n from '../../config/i18n';
import { AppDataProvider } from '../context/AppDataContext';
import { MembersProvider } from '../context/MembersContext';
import { SettingsProvider } from '../context/SettingsContext';
import AnalyticsView from './AnalyticsView';
import BuilderView from './BuilderView';
import PlayerView from './PlayerView';

const App = (): JSX.Element => {
  const context = useLocalContext();
  const { data: appContext, isSuccess } = hooks.useAppContext();

  useEffect(() => {
    if (['development', 'staging'].includes(SENTRY_ENV)) {
      if (isSuccess) {
        const m = appContext?.members?.find(
          ({ id }) => id === context.memberId,
        );
        if (m) {
          Sentry.setUser({
            id: m.id,
            email: m.email,
            username: m.name,
          });
        }
        Sentry.setContext('app-context', {
          itemId: appContext.id,
          name: appContext.name,
          path: appContext.path,
        });
      }
    }
  });

  useEffect(() => {
    // handle a change of language
    const lang = context?.lang ?? DEFAULT_LANG;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [context]);

  const renderContent = (): JSX.Element => {
    switch (context.context) {
      case Context.Builder:
        return <BuilderView />;

      case Context.Analytics:
        return <AnalyticsView />;

      case Context.Player:
      default:
        return <PlayerView />;
    }
  };

  return (
    <MembersProvider>
      <SettingsProvider>
        <AppDataProvider>{renderContent()}</AppDataProvider>
      </SettingsProvider>
    </MembersProvider>
  );
};

export default App;
