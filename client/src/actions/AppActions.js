import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
  PROFILES__GET_START,
  PROFILES__GET_END,
  PROFILES__GET_SUCCESS,
  PROFILES__GET_ERROR,

  CONTAINERS__GET_SUCCESS,
  CONTAINERS__GET_ERROR,

  IMAGES__GET_START,
  IMAGES__GET_END,
  IMAGES__GET_SUCCESS,
  IMAGES__GET_ERROR,

  REMOTE_IMAGES__GET_START,
  REMOTE_IMAGES__GET_END,
  REMOTE_IMAGES__GET_SUCCESS,
  REMOTE_IMAGES__GET_ERROR,

  AUTHENTICATE__SUCCESS,
  AUTHENTICATE__ERROR,
  AUTHENTICATE__START,
  AUTHENTICATE__END
} from '../constants/AppConstants';

function dispatchAction(actionType, data) {
  AppDispatcher.dispatch(Object.assign({
    actionType: actionType
  }, data || {}));
}

export default {

  async(funcs) {
    funcs.forEach((func) => {
      window.setTimeout(func);
    });
  },

  authenticate(credentials) {
    dispatchAction(AUTHENTICATE__START);
    var promise = WebAPI.authenticate(credentials)
    .then((response) => {
      if (response.token) {
        dispatchAction(AUTHENTICATE__SUCCESS, {
          token: response.token
        });
      }
    })
    .catch((e) => {
      dispatchAction(AUTHENTICATE__ERROR, { error: e });
    })
    .finally(() => dispatchAction(AUTHENTICATE__END));
  },

  getProfiles() {
    dispatchAction(PROFILES__GET_START);
    return WebAPI.getProfiles()
    .then((response) => {
      if (response.profiles) {
        AppDispatcher.dispatch({
          actionType: PROFILES__GET_SUCCESS,
          profiles: response.profiles
        });
      }
    })
    .catch((e) => {
      dispatchAction(PROFILES__GET_ERROR, { error: e });
    })
    .finally(() => dispatchAction(PROFILES__GET_END));
  },

  getContainers() {
    return WebAPI.getContainers()
    .then((response) => {
      if (response.containers) {
        dispatchAction(CONTAINERS__GET_SUCCESS, {
          containers: response.containers
        });
        return response.containers;
      }
      return [];
    })
    .catch((e) => {
      dispatchAction(CONTAINERS__GET_ERROR, { error: e });
    });
  },

  getImages() {
    dispatchAction(IMAGES__GET_START);
    WebAPI.getImages()
    .then((response) => {
      if (response.images) {
        dispatchAction(IMAGES__GET_SUCCESS, {
          images: response.images
        });
      }
    })
    .catch((e) => {
      dispatchAction(IMAGES__GET_ERROR, { error: e });
    })
    .finally(() => dispatchAction(IMAGES__GET_END));
  },

  getRemoteImages() {
    dispatchAction(REMOTE_IMAGES__GET_START);
    WebAPI.getRemoteImages()
    .then((response) => {
      if (response.images) {
        dispatchAction(REMOTE_IMAGES__GET_SUCCESS, {
          remoteImages: response.remoteImages
        });
      }
    })
    .catch((e) => {
      dispatchAction(REMOTE_IMAGES__GET_ERROR, { error: e });
    })
    .finally(() => dispatchAction(REMOTE_IMAGES__GET_END));
  },
};
