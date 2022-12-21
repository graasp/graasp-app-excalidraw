import { FC } from 'react';

import { APP_DATA_TYPES, APP_DATA_VISIBILITY } from '../config/appDataTypes';
import {
  CURRENT_ITEM_FONT_FAMILY,
  VIEW_BACKGROUND_COLOR,
} from '../config/settings';
import ExcalidrawView from './ExcalidrawView';
import Loader from './common/Loader';
import { useAppDataContext } from './context/AppDataContext';

const LoadView: FC = () => {
  const { postAppData, appDataArray } = useAppDataContext();
  // get if empty send empty and create else send new vals
  const appData = appDataArray.find(({ type }) => type === 'session');

  if (!appData) {
    // eslint-disable-next-line no-console
    console.log('posting app data');
    postAppData({
      data: {
        elements: [],
        state: {
          viewBackgroundColor: VIEW_BACKGROUND_COLOR,
          currentItemFontFamily: CURRENT_ITEM_FONT_FAMILY,
        },
      },
      type: APP_DATA_TYPES.SESSION_TYPE,
      visibility: APP_DATA_VISIBILITY.MEMBER,
    });
    return <Loader />;
  }
  return <ExcalidrawView appData={appData} />;
};
export default LoadView;
