import { FC } from 'react';

import { LocalContext } from '@graasp/apps-query-client';
import { Context } from '@graasp/sdk';

import LoadView from './LoaderView';

type Props = {
  context: LocalContext['context'];
};

const RenderView: FC<Props> = ({ context = Context.PLAYER }) => {
  switch (context) {
    case Context.BUILDER:
      return <LoadView />;
    case Context.ANALYTICS:
      return <>View not implemented</>;
    case Context.PLAYER:
    default:
      return <LoadView />;
  }
};
export default RenderView;
