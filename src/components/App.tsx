import { RecordOf } from 'immutable';

import React, { FC, ReactElement, useContext, useEffect } from 'react';

import { Context as HOCContext, LocalContext } from '@graasp/apps-query-client';
import { Context } from '@graasp/sdk';

import '../App.css';
import InitialData from '../InitialData';
import { DEFAULT_CONTEXT_LANGUAGE } from '../config/appSettings';
import i18n from '../config/i18n';
import getView from './Excalidraw';
import { AppDataProvider } from './context/AppDataContext';
import { AppSettingProvider } from './context/AppSettingContext';
import { MembersProvider } from './context/MembersContext';
import PlayerView from './views/read/PlayerView';

const App: FC = () => {
  const context: RecordOf<LocalContext> = useContext(HOCContext);

  useEffect(() => {
    // handle a change of language
    const lang = context?.get('lang') ?? DEFAULT_CONTEXT_LANGUAGE;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [context]);

  const renderContent = (): ReactElement => {
    switch (context.get('context')) {
      case Context.BUILDER:
      // todo: add the view to show in the builder

      // eslint-disable-next-line no-fallthrough
      case Context.ANALYTICS:
      // todo: add the view to show in the analyzer

      // eslint-disable-next-line no-fallthrough
      case Context.PLAYER:
        // find if data posted and send it.
        return getView(InitialData);
      // eslint-disable-next-line no-fallthrough
      default:
        return <PlayerView />;
    }
  };

  return (
    <MembersProvider>
      <AppDataProvider>
        <AppSettingProvider>{renderContent()}</AppSettingProvider>
      </AppDataProvider>
    </MembersProvider>
  );
};
export default App;
