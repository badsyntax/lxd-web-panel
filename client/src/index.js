import './index.scss';
import 'promise.prototype.finally';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';

const reactContainerElement = document.createElement('div');
document.body.appendChild(reactContainerElement);

ReactDOM.render(<Router />, reactContainerElement);

