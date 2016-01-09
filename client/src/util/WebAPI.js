'use strict';

import 'whatwg-fetch';
import _ from 'lodash';
import AuthStore from '../stores/AuthStore';

import {
  API__ENDPOINT,
} from '../constants/AppConstants';

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

  deleteImage(image) {
    return deleteJson({
      action: 'images/' + image
    });
  }

  getRemoteImages(server) {
    return getJson({
      action: 'images/remote/' + server
    });
  }

  getServers() {
    return getJson({
      action: 'remote'
    });
  }

  addServer(data) {
    return postJson({
      action: 'remote'
    }, data);
  }

  createImage(data) {
    return postJson({
      action: 'images'
    }, data);
  }
}

export default new API();

function parseJSON(response) {
  return response.json();
}

function checkResponseStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  var error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function checkJSONStatus(response) {
  if (!response.error) {
    return response;
  }
  var error = new Error(response.error);
  error.response = response;
  throw error;
}

function getJson(urlData, secure) {

  let url = getURL(urlData, secure);

  return fetch(url)
    .then(checkResponseStatus)
    .then(parseJSON)
    .then(checkJSONStatus);
}

function postJson(urlData, data, secure) {

  let url = getURL(urlData, secure);

  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(data)
  })
  .then(checkResponseStatus)
  .then(parseJSON);
}

function deleteJson(urlData, secure) {

  let url = getURL(urlData, secure);

  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'delete'
  })
  .then(checkResponseStatus)
  .then(parseJSON);
}

function getURL(data, secure) {

  secure = secure === undefined ? true : secure;
  var token = (secure ? '?token=' + AuthStore.getToken() : '');

  return [ API__ENDPOINT ]
    .concat(_.values(data))
    .join('/') + token;
}
