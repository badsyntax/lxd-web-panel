'use strict';

import 'whatwg-fetch';
import _ from 'lodash';
import AuthStore from '../stores/AuthStore';

import {
  API__ENDPOINT,
} from '../constants/AppConstants';

function getJson(url) {

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

function postJson(url, data) {
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

function getURL(parts) {
  return [ API__ENDPOINT ].concat(parts).join('/');
}

class API {

  authenticate(credentials) {
    let url = getURL(_.values({
      action: 'authenticate'
    }));
    return postJson(url, credentials);
  }

  getServerInfo() {
    let url = getURL(_.values({
      action: 'serverinfo'
    })) + '?token=' + AuthStore.getToken();
    return getJson(url);
  }

  getContainers() {
    let url = getURL(_.values({
      action: 'containers'
    })) + '?token=' + AuthStore.getToken();
    return getJson(url);
  }

  getProfiles() {
    let url = getURL(_.values({
      action: 'profiles'
    })) + '?token=' + AuthStore.getToken();
    return getJson(url);
  }

  getNews(opts) {

    let url = getURL(_.values(_.merge({
      action: 'list',
      sort: 'latest',
      start: 0,
      count: 30
    }, opts)));

    let promise = DEBUG_MOCK_DATA ? MockData.getData('news') : cacheFetchJson(url, {
      age: NEWS_CACHE_AGE
    });

    return promise.then((json) => {
      return json.news;
    });
  }

  getPost(postId) {

    let url = getURL(_.values({
      action: 'comments',
      postId: postId
    }));

    let promise = DEBUG_MOCK_DATA ? MockData.getData('post') : fetchJson(url);

    return promise.then((comments) => {
      return {
        post: null,
        comments: comments
      };
    });
  }
}

export default new API();
