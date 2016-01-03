import React from 'react';
import WebAPI from '../../util/WebAPI';

export default class Home extends React.Component {
  state = {
    serverinfo: {}
  }
  componentWillMount() {
    WebAPI.getServerInfo()
    .then(function(response) {
      if (response.error) {
        alert('error');
      } else {
        this.setState({
          serverinfo: response.serverinfo
        });
      }
    }.bind(this));
  }
  render() {
    return (
      <div className={'home'}>
        <h2 className="sub-header">Server Info</h2>
        <div>{ getList(this.state.serverinfo) }</div>
      </div>
    );

    function getList(object, level) {
      return (
        <ul key={'list-' + ((level || 0) + 1)}>
          { Object.keys(object).map(getListItem) }
        </ul>
      );

      function getListItem(key) {
        var val = object[key];
        if (typeof val !== 'object') {
          return (
            <li key={key}>{key}: { val }</li>
          );
        } else {
          return (
            <li key={key}>
              {key}
              { getList(val, level) }
            </li>
          );
        }
      }
    }
  }
}
