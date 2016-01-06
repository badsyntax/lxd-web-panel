import React from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import LogViewer from '../../components/LogViewer/LogViewer.jsx';

import sidebarPages from '../../data/pages';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
              <Sidebar pages={sidebarPages} />
            </div>
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
              {this.props.children}
            </div>
          </div>
        </div>
        <LogViewer />
      </div>
    );
  }
}
