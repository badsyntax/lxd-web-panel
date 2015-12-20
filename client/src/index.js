import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

import App from './components/App/App.jsx';
import Containers from './components/Containers/Containers.jsx';
import SignIn from './components/SignIn/SignIn.jsx';
import Home from './components/Home/Home.jsx';

import AuthStore from './stores/AuthStore';

function requireAuth(nextState, replaceState) {
  if (!AuthStore.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/signin')
  }
}

const reactContainerElement = document.createElement('div');
document.body.appendChild(reactContainerElement);

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={requireAuth} />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="containers" component={Containers} onEnter={requireAuth} />
      <Route path="signin" component={SignIn} />
    </Route>
  </Router>
), reactContainerElement);
