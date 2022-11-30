import { RecordOf } from 'immutable';

import React, { FC, ReactElement, useContext, useEffect } from 'react';

import { Context as HOCContext, LocalContext } from '@graasp/apps-query-client';
import { Context } from '@graasp/sdk';

import '../App.css';
import { DEFAULT_CONTEXT_LANGUAGE } from '../config/appSettings';
import i18n from '../config/i18n';
import LoadView from './Excalidraw';
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
        return LoadView();
      case Context.ANALYTICS:
        return LoadView();
      case Context.PLAYER:
        return LoadView();
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
