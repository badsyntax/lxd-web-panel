import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className={'navbar navbar-inverse navbar-fixed-top'}>
        <div className={'container'}>
          <div className={'navbar-header'}>
            <a className={'navbar-brand'} href={'#'}>LXD Web Panel</a>
          </div>
          <div id={'navbar'} className={'collapse navbar-collapse'}>
            <ul className={'nav navbar-nav'}>
              <li>
                <Link to={'home'} activeClassName={'active'}>Home</Link>
              </li>
              <li>
                <Link to={'signin'} activeClassName={'active'}>Sign In</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
