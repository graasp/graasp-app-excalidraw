/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useRef, useState } from 'react';

import { Excalidraw } from '@excalidraw/excalidraw';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import {
  AppState,
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
} from '@excalidraw/excalidraw/types/types';

function getView(initialData: any): ReactElement {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
  const [viewModeEnabled] = useState(false);
  const [zenModeEnabled] = useState(false);
  const [gridModeEnabled] = useState(false);
  const [theme] = useState<ExcalidrawProps['theme']>('light');

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
          initialData={initialData}
          onChange={(elements: readonly ExcalidrawElement[], state: AppState) =>
            () => {
              console.log('Elements :', elements, 'State : ', state);
              // post elements and state
            }}
          onPointerUpdate={(payload) => console.log(payload)}
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
          theme={theme}
          name="Custom name of drawing"
        />
      </div>
    </div>
  );
}
