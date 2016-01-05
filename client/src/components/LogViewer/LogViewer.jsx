import './LogViewer.scss';
import React from 'react';
import { LOGSERVER_ENDPOINT } from '../../constants/AppConstants';

const MAX_MESSAGES = 100;
const SCROLL_LENIANCY = 10;

export default class LogViewer extends React.Component {

  state = {
    messages: []
  }

  constructor(...props) {
    super(...props)
    this.shouldScrollList = true;
    this.initWebSocketConnection();
  }

  initWebSocketConnection() {
    this.wsMessagePromise = Promise.resolve();
    this.ws = new WebSocket(LOGSERVER_ENDPOINT);
    this.ws.onmessage = this.onWebSocketMessage;
  }

  scrollList() {
    if (!this.shouldScrollList) { return; }
    var list = this.refs.list;
    list.scrollTop = list.scrollHeight;
  }

  setMessage(message) {

    message = message.replace(/t\=.*? /, '');
    message = message.replace(/lvl\=.*? /, '');
    message = message.replace(/ip\=[0-9\.]+(\:[0-9]+)?/, '');

    var messages = this.state.messages;
    messages.push(message);
    if (messages.length > MAX_MESSAGES) {
      messages.shift();
    }
    this.setState({
      messages: messages
    });
  }

  onWebSocketMessage = (e) => {
    var messages = e.data.split('\n');
    this.wsMessagePromise = this.wsMessagePromise.then(() => {
      return messages.reduce((promise, message) => {
        return promise.then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              this.setMessage(message);
              this.scrollList();
              resolve();
            }, 200);
          });
        });
      }, Promise.resolve());
    });
  }

  onListScroll = (e) => {
    /*var list = this.refs.list;
    this.shouldScrollList = (
      list.scrollTop + list.clientHeight + SCROLL_LENIANCY >=
      list.scrollHeight
    );*/
  }

  render() {
    let messages = this.state.messages;
    return (
      <div className={'log-viewer'}>
        { messages.length ? (
          <ul
            className="log-viewer__list"
            onScroll={this.onListScroll}
            ref="list"
          >
            { messages.map((message, i) => {
              return (
                <li
                  className="log-viewer__list-item"
                  key={'log-message-' + i}
                >
                  { message }
                </li>
              );
            })}
          </ul>
        ) : <span className="log-viewer__message">Log messages will appear here.</span> }
      </div>
    );
    return this.renderMessages(this.state.messages);
  }
}
