import isObject from 'lodash.isobject';
import isString from 'lodash.isstring';

import { toast } from 'react-toastify';

import { UNEXPECTED_ERROR_MESSAGE } from '../config/messages';

const showErrorToast = (payload: string | { message: string }): void => {
  let message = UNEXPECTED_ERROR_MESSAGE;
  if (isString(payload)) {
    message = payload;
  } else if (isObject(payload)) {
    if (payload.message) {
      ({ message } = payload);
    }
  }

  toast.error(message, {
    toastId: message,
    position: 'bottom-right',
  });
};

// eslint-disable-next-line import/prefer-default-export
export { showErrorToast };
