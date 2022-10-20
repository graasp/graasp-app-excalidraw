/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useEffect, useState, useRef } from 'react';
import './App.css';
import { Excalidraw } from '@excalidraw/excalidraw';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import {
  AppState,
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
} from '@excalidraw/excalidraw/types/types';

import logo from './logo.svg';
import InitialData from './InitialData';

const App: FC = () => {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [theme, setTheme] = useState<ExcalidrawProps['theme']>('light');

  /*   useEffect(() => {
    const onHashChange = () => {
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const libraryUrl = hash.get('addLibrary');
      if (libraryUrl) {
        excalidrawRef.current!.updateLibrary(libraryUrl, hash.get('token'));
      }
    };
    window.addEventListener('hashchange', onHashChange, false);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []); */

  return (
    <div className="App">
      <div className="button-modalities-wrapper">
        <label>
          <input
            type="checkbox"
            checked={viewModeEnabled}
            onChange={() => setViewModeEnabled(!viewModeEnabled)}
          />
          View mode
        </label>

        <label>
          <input
            type="checkbox"
            checked={zenModeEnabled}
            onChange={() => setZenModeEnabled(!zenModeEnabled)}
          />
          Zen mode
        </label>

        <label>
          <input
            type="checkbox"
            checked={gridModeEnabled}
            onChange={() => setGridModeEnabled(!gridModeEnabled)}
          />
          Grid mode
        </label>
      </div>
      <div
        className="excalidraw-wrapper"
        style={{
          height: '800px',
          margin: '50px',
        }}
      >
        <>
          <Excalidraw
            ref={excalidrawRef}
            initialData={InitialData}
            onChange={(
                elements: readonly ExcalidrawElement[],
                state: AppState,
              ) =>
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
        </>
      </div>
    </div>
  );
};

export default App;
