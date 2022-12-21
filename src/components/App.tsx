import { FC, ReactElement, useEffect } from 'react';

import { useLocalContext } from '@graasp/apps-query-client';
import { Context } from '@graasp/sdk';

import '../App.css';
import { DEFAULT_CONTEXT_LANGUAGE } from '../config/appSettings';
import i18n from '../config/i18n';
import LoadView from './Excalidraw';
import Loader from './common/Loader';
import { AppDataProvider } from './context/AppDataContext';
import { AppSettingProvider } from './context/AppSettingContext';
import { MembersProvider } from './context/MembersContext';

const App: FC = () => {
  const context = useLocalContext();
  // eslint-disable-next-line no-console
  console.log(context.toJS());

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
        return <LoadView />;
      case Context.ANALYTICS:
        return <Loader />;
      case Context.PLAYER:
        // eslint-disable-next-line no-console
        console.log('rendering for player');
        return <LoadView />;
      default:
        return <Loader />;
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
