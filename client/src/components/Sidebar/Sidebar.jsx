import React from 'react';
import { Link } from 'react-router';

const activeClassName = 'active';

export default class Navbar extends React.Component {
  render() {
    return (
      <ul className="nav nav-sidebar">
       <li>
        <Link activeClassName={activeClassName} to={'overview'}>
          Overview
        </Link>
      </li>
      <li>
        <Link activeClassName={activeClassName} to={'containers'}>
          Containers
        </Link>
      </li>
      <li>
        <Link activeClassName={activeClassName} to={'profiles'}>
          Profiles
        </Link>
      </li>
      <li>
        <Link activeClassName={activeClassName} to={'images'}>
          Images
        </Link>
      </li>
    </ul>
    );
  }
}
