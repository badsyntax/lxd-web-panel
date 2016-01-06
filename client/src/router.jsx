import React from 'react';

import {
  Router,
  Route,
  IndexRoute,
} from 'react-router';

import App from './views/App/App.jsx';
import Containers from './views/Containers/Containers.jsx';
import ContainerCreate from './views/ContainerCreate/ContainerCreate.jsx';
import ContainersList from './views/ContainersList/ContainersList.jsx';
import Profiles from './views/Profiles/Profiles.jsx';
import ProfilesList from './views/ProfilesList/ProfilesList.jsx';
import Images from './views/Images/Images.jsx';
import ImagesList from './views/ImagesList/ImagesList.jsx';
import ImagesImport from './views/ImagesImport/ImagesImport.jsx';

import Config from './views/Config/Config.jsx';
import Users from './views/Users/Users.jsx';
import RemoteServers from './views/RemoteServers/RemoteServers.jsx';
import UserInterface from './views/UserInterface/UserInterface.jsx';
import SignIn from './views/SignIn/SignIn.jsx';
import SignOut from './views/SignOut/SignOut.jsx';
import Home from './views/Home/Home.jsx';

import AuthStore from './stores/AuthStore';

export default (props) => {
  return (
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
          <Route component={ImagesImport} path="/images/import" />
        </Route>
        <Route component={RemoteServers} onEnter={requireAuth} path="/remote-servers" />
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
