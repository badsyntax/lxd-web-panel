import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
  PROFILES__GET_SUCCESS,
  PROFILES__GET_ERROR,

  CONTAINERS__GET_SUCCESS,
  CONTAINERS__GET_ERROR,
} from '../constants/AppConstants';

export default {
  getProfiles() {
    WebAPI.getProfiles()
    .then((response) => {
      if (response.error) {
        AppDispatcher.dispatch({
          actionType: PROFILES__GET_ERROR
        });
      }
      if (response.profiles) {
        AppDispatcher.dispatch({
          actionType: PROFILES__GET_SUCCESS,
          profiles: response.profiles
        });
      }
    })
    .catch(() => {
      AppDispatcher.dispatch({
        actionType: PROFILES__GET_ERROR
      });
    });
  },

  getContainers() {
    WebAPI.getContainers()
    .then((response) => {
      if (response.error) {
        AppDispatcher.dispatch({
          actionType: CONTAINERS__GET_ERROR
        });
      }
      if (response.containers) {
        AppDispatcher.dispatch({
          actionType: CONTAINERS__GET_SUCCESS,
          containers: response.containers
        });
      }
    })
    .catch(() => {
      AppDispatcher.dispatch({
        actionType: CONTAINERS__GET_ERROR
      });
    });
  }
};
