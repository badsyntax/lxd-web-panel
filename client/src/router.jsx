import React from 'react';

import {
  Router,
  Route,
  IndexRoute,
} from 'react-router';

import App from './views/App/App';
import Containers from './views/Containers/Containers';
import ContainerCreate from './views/Containers/ContainerCreate/ContainerCreate';
import ContainersList from './views/Containers/ContainersList/ContainersList';
import Profiles from './views/Profiles/Profiles';
import ProfilesList from './views/Profiles/ProfilesList/ProfilesList';
import Images from './views/Images/Images';
import ImagesList from './views/Images/ImagesList/ImagesList';
import ImagesImport from './views/Images/ImagesImport/ImagesImport';

import Config from './views/Config/Config';
import Users from './views/Users/Users';
import Servers from './views/Servers/Servers';
import ServersList from './views/Servers/ServersList/ServersList';
import UserInterface from './views/UserInterface/UserInterface';
import SignIn from './views/SignIn/SignIn';
import SignOut from './views/SignOut/SignOut';
import Home from './views/Home/Home';

import AuthStore from './stores/AuthStore';

export default (props) => {
  return (
    <Router>
      <Route component={App} path="/">
        <IndexRoute component={Home} onEnter={requireAuth} />
        <Route component={Home} onEnter={requireAuth} path="/overview" />
        <Route component={Containers} onEnter={requireAuth} path="/containers">
          <IndexRoute component={ContainersList} />
          <Route component={ContainersList} path="/containers/list" />
          <Route component={ContainerCreate} path="/containers/create" />
        </Route>
        <Route component={Profiles} onEnter={requireAuth} path="/profiles">
          <IndexRoute component={ProfilesList} />
          <Route component={ProfilesList} path="/profiles/list" />
        </Route>
        <Route component={Images} onEnter={requireAuth} path="/images">
          <IndexRoute component={ImagesList} />
          <Route component={ImagesList} path="/images/list" />
          <Route component={ImagesImport} path="/images/import" />
        </Route>
        <Route component={Servers} onEnter={requireAuth} path="/servers">
          <IndexRoute component={ServersList} />
          <Route component={ServersList} path="/servers/list" />
        </Route>
        <Route component={Config} onEnter={requireAuth} path="/config" />
        <Route component={Users} onEnter={requireAuth} path="/users" />
        <Route component={UserInterface} onEnter={requireAuth} path="/user-interface" />
      </Route>
      <Route component={SignIn} path="/signin" />
      <Route component={SignOut} path="/signout" />
    </Router>
  );
};

function requireAuth(nextState, replaceState) {
  if (!AuthStore.loggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/signin');
  }
}
