import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import {
  Router,
  Route,
  Link,
  IndexRoute,
  Redirect
} from 'react-router';

import 'promise.prototype.finally';

import App from './components/App/App.jsx';
import Containers from './components/Containers/Containers.jsx';
import ContainerCreate from './components/ContainerCreate/ContainerCreate.jsx';
import ContainersList from './components/ContainersList/ContainersList.jsx';
import Profiles from './components/Profiles/Profiles.jsx';
import ProfilesList from './components/ProfilesList/ProfilesList.jsx';
import Images from './components/Images/Images.jsx';
import ImagesList from './components/ImagesList/ImagesList.jsx';

import SignIn from './components/SignIn/SignIn.jsx';
import SignOut from './components/SignOut/SignOut.jsx';
import Home from './components/Home/Home.jsx';

import AuthStore from './stores/AuthStore';



function requireAuth(nextState, replaceState) {
  if (!AuthStore.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/signin')
  }
}

const reactContainerElement = document.createElement('div');
document.body.appendChild(reactContainerElement);

const createBrowserHistory = require('history/lib/createBrowserHistory');

ReactDOM.render((
  <Router>
    <Route component={App} path="/">
      <IndexRoute component={Home} onEnter={requireAuth} />
      <Route component={Home} onEnter={requireAuth} path="/overview" />
      <Route component={Containers} onEnter={requireAuth} path="/containers">
        <IndexRoute component={ContainersList}  />
        <Route component={ContainersList} path="/containers/list" />
        <Route component={ContainerCreate} path="/containers/create" />
      </Route>
      <Route component={Profiles} onEnter={requireAuth} path="/profiles">
        <IndexRoute component={ProfilesList}  />
        <Route component={ProfilesList} path="/profiles/list" />
      </Route>
      <Route component={Images} onEnter={requireAuth} path="/images">
        <IndexRoute component={ImagesList}  />
        <Route component={ImagesList} path="/images/list" />
      </Route>
    </Route>
    <Route component={SignIn} path="/signin" />
    <Route component={SignOut} path="/signout" />
  </Router>
), reactContainerElement);
