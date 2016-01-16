import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
  PROFILES__GET_START,
  PROFILES__GET_END,
  PROFILES__GET_SUCCESS,
  PROFILES__GET_ERROR,

  CONTAINERS__GET_SUCCESS,
  CONTAINERS__GET_ERROR,

  CONTAINER_CREATE__START,
  CONTAINER_CREATE__END,
  CONTAINER_CREATE__SUCCESS,
  CONTAINER_CREATE__ERROR,

  IMAGES__GET_START,
  IMAGES__GET_END,
  IMAGES__GET_SUCCESS,
  IMAGES__GET_ERROR,

  IMAGE_CREATE__START,
  IMAGE_CREATE__END,
  IMAGE_CREATE__SUCCESS,
  IMAGE_CREATE__ERROR,

  IMAGE_DELETE__START,
  IMAGE_DELETE__END,
  IMAGE_DELETE__SUCCESS,
  IMAGE_DELETE__ERROR,

  IMAGE_IMPORT__START,
  IMAGE_IMPORT__END,
  IMAGE_IMPORT__SUCCESS,
  IMAGE_IMPORT__ERROR,

  REMOTE_IMAGES__GET_START,
  REMOTE_IMAGES__GET_END,
  REMOTE_IMAGES__GET_SUCCESS,
  REMOTE_IMAGES__GET_ERROR,

  SERVERS__GET_START,
  SERVERS__GET_END,
  SERVERS__GET_SUCCESS,
  SERVERS__GET_ERROR,

  SERVER_ADD__START,
  SERVER_ADD__END,
  SERVER_ADD__SUCCESS,
  SERVER_ADD__ERROR,

  AUTHENTICATE__SUCCESS,
  AUTHENTICATE__ERROR,
  AUTHENTICATE__START,
  AUTHENTICATE__END,

  MODAL__SHOW,
  MODAL__HIDE,
  MODAL__CONFIRM
} from '../constants/AppConstants';

function dispatchAction(actionType, data) {
  console.log('dispatchiing', actionType);
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

  confirm(options) {
    dispatchAction(MODAL__CONFIRM, options);
  },

  modalShow(options) {
    dispatchAction(MODAL__SHOW, options);
  },

  modalHide(options) {
    dispatchAction(MODAL__HIDE, options);
  },

  authenticate(credentials) {
    dispatchAction(AUTHENTICATE__START);
    return WebAPI.authenticate(credentials)
    .then((response) => {
      if (response.token) {
        dispatchAction(AUTHENTICATE__SUCCESS, response);
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
        dispatchAction(PROFILES__GET_SUCCESS, response);
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
        dispatchAction(CONTAINERS__GET_SUCCESS, response);
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
        dispatchAction(IMAGES__GET_SUCCESS, response);
      }
    })
    .catch((e) => {
      dispatchAction(IMAGES__GET_ERROR, { error: e });
    })
    .finally(() => dispatchAction(IMAGES__GET_END));
  },

  getRemoteImages(server, showLoadingModal) {
    dispatchAction(REMOTE_IMAGES__GET_START, { showLoadingModal });
    WebAPI.getRemoteImages(server)
    .then((response) => {
      if (response.images) {
        dispatchAction(REMOTE_IMAGES__GET_SUCCESS, response);
      }
    })
    .catch((e) => {
      dispatchAction(REMOTE_IMAGES__GET_ERROR, { error: e });
    })
    .finally(() => dispatchAction(REMOTE_IMAGES__GET_END, { showLoadingModal }));
  },

  getServers() {
    dispatchAction(SERVERS__GET_START);
    WebAPI.getServers()
    .then((response) => {
      if (response.servers) {
        dispatchAction(SERVERS__GET_SUCCESS, response);
      }
    })
    .catch((e) => {
      dispatchAction(SERVERS__GET_ERROR, { error: e });
    })
    .finally(() => dispatchAction(SERVERS__GET_END));
  },

  createContainer(containerCreateModel) {
    let data = containerCreateModel.get();
    data.profiles = data.profiles.map((profile) => profile.get());

    dispatchAction(CONTAINER_CREATE__START);
    WebAPI.createContainer(data)
    .then((response) => {
      if (response.message) {
        dispatchAction(CONTAINER_CREATE__SUCCESS, response);
      }
    })
    .catch((e) => {
      dispatchAction(CONTAINER_CREATE__ERROR, { error: e });
    })
    .finally(() => dispatchAction(CONTAINER_CREATE__END));
  },

  createImage(imageCreateModel) {
    let data = imageCreateModel.get();

    dispatchAction(IMAGE_CREATE__START);
    WebAPI.createImage(data)
    .then((response) => {
      if (response.message) {
        dispatchAction(IMAGE_CREATE__SUCCESS, response);
      }
    })
    .catch((e) => {
      dispatchAction(IMAGE_CREATE__ERROR, { error: e });
    })
    .finally(() => dispatchAction(IMAGE_CREATE__END));
  },

  deleteImage(imageModel) {
    let data = imageModel.get();

    dispatchAction(IMAGE_DELETE__START);
    WebAPI.deleteImage(data.fingerprint)
    .then((response) => {
      if (response.message) {
        dispatchAction(IMAGE_DELETE__SUCCESS, response);
      }
    })
    .catch((e) => {
      dispatchAction(IMAGE_DELETE__ERROR, { error: e });
    })
    .finally(() => dispatchAction(IMAGE_DELETE__END));
  },

  importImage(imageImportModel) {

    let data = imageImportModel.get();

    dispatchAction(IMAGE_IMPORT__START);
    WebAPI.importImage(data)
    .then((response) => {
      if (response.message) {
        dispatchAction(IMAGE_IMPORT__SUCCESS, response);
      }
    })
    .catch((e) => {
      dispatchAction(IMAGE_IMPORT__ERROR, { error: e });
    })
    .finally(() => dispatchAction(IMAGE_IMPORT__END));
  },

  addServer(serverModel) {

    let data = serverModel.get();

    dispatchAction(SERVER_ADD__START);
    WebAPI.addServer(data)
    .then((response) => {
      if (response.message) {
        dispatchAction(SERVER_ADD__SUCCESS, response);
      }
    })
    .catch((e) => {
      dispatchAction(SERVER_ADD__ERROR, { error: e });
    })
    .finally(() => dispatchAction(SERVER_ADD__END));
  }
};
