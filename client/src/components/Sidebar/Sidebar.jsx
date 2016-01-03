import React from 'react';
import { Link } from 'react-router';

const activeClassName = 'active';

let pages = [
  {
    path: 'overview',
    label: 'Overview'
  },
  {
    path: 'containers',
    label: 'Container'
  },
  {
    path: 'profiles',
    label: 'Profiles'
  },
  {
    path: 'images',
    label: 'Images'
  },
  {
    path: 'config',
    label: 'Config'
  },
  {
    path: 'users',
    label: 'Users'
  },
  {
    path: 'user-interface',
    label: 'User Interface'
  }
];

export default class Navbar extends React.Component {
  render() {
    return (
      <ul className="nav nav-sidebar">
      { pages.map((page, i) => {
        return (
          <li key={'page-' + i}>
            <Link activeClassName={activeClassName} to={page.path}>
              { page.label }
            </Link>
          </li>
        );
      })}
      </ul>
    );
  }
}
