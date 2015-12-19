import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';

const config = process.env;

console.log('CONFIG', config);

const reactContainerElement = document.createElement('div');
document.body.appendChild(reactContainerElement);
ReactDOM.render(<App />, reactContainerElement);
