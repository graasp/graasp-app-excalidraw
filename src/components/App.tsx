import { RecordOf } from 'immutable';

import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Context as HOCContext, LocalContext } from '@graasp/apps-query-client';
import { Context } from '@graasp/sdk';

import { Excalidraw } from '@excalidraw/excalidraw';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import {
  AppState,
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
} from '@excalidraw/excalidraw/types/types';

import '../App.css';
import InitialData from '../InitialData';
import { DEFAULT_CONTEXT_LANGUAGE } from '../config/appSettings';
import i18n from '../config/i18n';
import logo from '../logo.svg';
import { AppDataProvider } from './context/AppDataContext';
import { AppSettingProvider } from './context/AppSettingContext';
import { MembersProvider } from './context/MembersContext';
import PlayerView from './views/read/PlayerView';

const App: FC = () => {
  const context: RecordOf<LocalContext> = useContext(HOCContext);
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [theme, setTheme] = useState<ExcalidrawProps['theme']>('light');

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
      // todo: add the view to show in the player

      // eslint-disable-next-line no-fallthrough
      default:
        return <PlayerView />;
    }
  };

  return (
    <div className="App">
      <div
        className="excalidraw-wrapper"
        style={{
          height: '800px',
        }}
      >
        <Excalidraw
          ref={excalidrawRef}
          initialData={InitialData}
          onChange={(elements: readonly ExcalidrawElement[], state: AppState) =>
            () => {
              console.log('Elements :', elements, 'State : ', state);
            }}
          onPointerUpdate={(payload) => console.log(payload)}
          onCollabButtonClick={() =>
            window.alert('You clicked on collab button')
          }
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
          theme={theme}
          name="Custom name of drawing"
        />
      </div>
    </div>
  );
};

export default App;
