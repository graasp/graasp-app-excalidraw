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
import { AppSettingProvider } from './context/AppSettingContext';
import { MembersProvider } from './context/MembersContext';

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
      case Context.BUILDER:
        return <ExcalidrawView />;
      case Context.ANALYTICS:
        return <>View not implemented</>;
      case Context.PLAYER:
      default:
        return <ExcalidrawView />;
    }
  };

  return (
    <MembersProvider>
      <AppDataProvider>
        <AppSettingProvider>
          {renderContext(context.context ?? DEFAULT_CONTEXT)}
        </AppSettingProvider>
      </AppDataProvider>
    </MembersProvider>
  );
};
export default App;
