import React from 'react';
import { Link } from 'react-router';

const activeClassName = 'active';

export default class Navbar extends React.Component {

  static propTypes = {
    pages: React.PropTypes.array.isRequired
  }

  render() {
    return (
      <ul className="nav nav-sidebar">
      { this.props.pages.map((page, i) => {
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
