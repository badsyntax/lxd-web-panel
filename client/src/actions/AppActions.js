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

  AUTHENTICATE__SUCCESS,
  AUTHENTICATE__ERROR,
  AUTHENTICATE__START,
  AUTHENTICATE__END
} from '../constants/AppConstants';

export default {

  async(funcs) {
    funcs.forEach((func) => {
      window.setTimeout(func);
    });
  },

  authenticate(credentials) {
    AppDispatcher.dispatch({
      actionType: AUTHENTICATE__START
    });
    var promise = WebAPI.authenticate(credentials)
    .then((response) => {
      if (response.token) {
        AppDispatcher.dispatch({
          actionType: AUTHENTICATE__SUCCESS,
          token: response.token
        });
      }
    })
    .catch((e) => {
      AppDispatcher.dispatch({
        actionType: AUTHENTICATE__ERROR,
        error: e
      });
    })
    .finally(() => {
      AppDispatcher.dispatch({
        actionType: AUTHENTICATE__END
      });
    });
  },

  getProfiles() {
    AppDispatcher.dispatch({
      actionType: PROFILES__GET_START
    });
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
      AppDispatcher.dispatch({
        actionType: PROFILES__GET_ERROR,
        error: e
      });
    })
    .finally(() => {
      AppDispatcher.dispatch({
        actionType: PROFILES__GET_END
      });
    });
  },

  getContainers() {
    return WebAPI.getContainers()
    .then((response) => {
      if (response.containers) {
        AppDispatcher.dispatch({
          actionType: CONTAINERS__GET_SUCCESS,
          containers: response.containers
        });
        return response.containers;
      }
      return [];
    })
    .catch((e) => {
      AppDispatcher.dispatch({
        actionType: CONTAINERS__GET_ERROR,
        error: e
      });
    });
  },

  getImages() {
    AppDispatcher.dispatch({
      actionType: IMAGES__GET_START
    });
    WebAPI.getImages()
    .then((response) => {
      if (response.images) {
        AppDispatcher.dispatch({
          actionType: IMAGES__GET_SUCCESS,
          images: response.images
        });
      }
    })
    .catch(() => {
      AppDispatcher.dispatch({
        actionType: IMAGES__GET_ERROR
      });
    })
    .finally(() => {
      AppDispatcher.dispatch({
        actionType: IMAGES__GET_END
      });
    });
  }
};
