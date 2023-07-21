import { FC, useEffect } from 'react';

import { useLocalContext } from '@graasp/apps-query-client';
import { Context } from '@graasp/sdk';

import {
  DEFAULT_CONTEXT,
  DEFAULT_CONTEXT_LANGUAGE,
} from '../config/appSettings';
import i18n from '../config/i18n';
import ExcalidrawView from './ExcalidrawView';
import { AppDataProvider } from './context/AppDataContext';
import { MembersProvider } from './context/MembersContext';
import { SettingsProvider } from './context/SettingsContext';

const App: FC = () => {
  const context = useLocalContext();

  useEffect(() => {
    // handle a change of language
    const lang = context?.get('lang') ?? DEFAULT_CONTEXT_LANGUAGE;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [context]);

  const renderContext = (c: Context | string): JSX.Element => {
    switch (c) {
      case Context.Builder:
        return <ExcalidrawView />;
      case Context.Analytics:
        return <>View not implemented</>;
      case Context.Player:
      default:
        return <ExcalidrawView />;
    }
  };

  return (
    <MembersProvider>
      <AppDataProvider>
        <SettingsProvider>
          {renderContext(context.context ?? DEFAULT_CONTEXT)}
        </SettingsProvider>
      </AppDataProvider>
    </MembersProvider>
  );
};
export default App;
