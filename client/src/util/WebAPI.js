import 'whatwg-fetch';
import _ from 'lodash';
import AuthStore from '../stores/AuthStore';

import {
  API__ENDPOINT,
} from '../constants/AppConstants';

function getJson(urlData, secure) {

  let url = getURL(urlData, secure);

  return fetch(url)
    .then(checkStatus)
    .then(parseJSON);

  function parseJSON(response) {
    return response.json()
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}

function postJson(urlData, data, secure) {

  let url = getURL(urlData, secure);

  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  });
}

function getURL(data, secure) {
  secure = secure === undefined ? true : secure;
  return [ API__ENDPOINT ].concat(_.values(data)).join('/') + (secure ? '?token=' + AuthStore.getToken() : '');
}

class API {

  authenticate(credentials) {
    return postJson({
      action: 'authenticate'
    }, credentials, false);
  }

  getServerInfo() {
    return getJson({
      action: 'serverinfo'
    });
  }

  getContainers() {
    return getJson({
      action: 'containers/detailed'
    });
  }

  getProfiles() {
    return getJson({
      action: 'profiles/detailed'
    });
  }

  getImages() {
    return getJson({
      action: 'images/detailed'
    });
  }
}

export default new API();
