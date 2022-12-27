import { FC, useEffect } from 'react';

import { useLocalContext } from '@graasp/apps-query-client';

import { DEFAULT_CONTEXT_LANGUAGE } from '../config/appSettings';
import i18n from '../config/i18n';
import RenderView from './RenderView';
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

  return (
    <MembersProvider>
      <AppDataProvider>
        <AppSettingProvider>
          <RenderView context={context?.context} />
        </AppSettingProvider>
      </AppDataProvider>
    </MembersProvider>
  );
};
export default App;
