import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router';

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

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={requireAuth} />
      <Route path="overview" component={Home} onEnter={requireAuth} />
      <Route path="containers" component={Containers} onEnter={requireAuth}>
        <IndexRoute component={ContainersList}  />
        <Route path="/containers/list" component={ContainersList}/>
        <Route path="/containers/create" component={ContainerCreate}/>
      </Route>
      <Route path="profiles" component={Profiles} onEnter={requireAuth}>
        <IndexRoute component={ProfilesList}  />
        <Route path="/profiles/list" component={ProfilesList}/>
      </Route>
      <Route path="images" component={Images} onEnter={requireAuth}>
        <IndexRoute component={ImagesList}  />
        <Route path="/images/list" component={ImagesList}/>
      </Route>
    </Route>
    <Route path="signin" component={SignIn} />
    <Route path="signout" component={SignOut} />
  </Router>
), reactContainerElement);
