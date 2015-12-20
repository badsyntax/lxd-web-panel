import React from 'react';
import { Link } from 'react-router';

const activeClassName = 'active';

export default class Navbar extends React.Component {
  render() {
    return (
      <ul className="nav nav-sidebar">
       <li>
        <Link to={'overview'} activeClassName={activeClassName}>
          Overview
        </Link>
      </li>
      <li>
        <Link to={'containers'} activeClassName={activeClassName}>
          Containers
        </Link>
      </li>
      <li>
        <Link to={'profiles'} activeClassName={activeClassName}>
          Profiles
        </Link>
      </li>
      <li>
        <Link to={'images'} activeClassName={activeClassName}>
          Images
        </Link>
      </li>
    </ul>
    );
  }
}
