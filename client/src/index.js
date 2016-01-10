'use strict';

import 'bootstrap-loader';

import './index.scss';
import 'promise.prototype.finally';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import jQuery from 'jquery';

console.log(jQuery.fn);

const reactContainerElement = document.createElement('div');
document.body.appendChild(reactContainerElement);

ReactDOM.render(<Router />, reactContainerElement);

