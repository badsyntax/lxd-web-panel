'use strict';

import Flux from 'flux';
import { EventEmitter } from 'events';

class AppDispatcher extends Flux.Dispatcher {

  constructor(actionHandler) {
    super(...arguments);
    this.emitter = new EventEmitter();
    this.register((action) => this.emitter.emit(action.actionType, action));
  }

  on(eventName, handler) {
    if (typeof eventName === 'object') {
      Object.keys(eventName).forEach((key) => this.emitter.on(key, eventName[key]));
    } else {
      this.emitter.on(eventName, handler);
    }
  }

  off(eventName, handler) {
    if (typeof eventName === 'object') {
      Object.keys(eventName).forEach((key) => this.emitter.removeListener(key, eventName[key]));
    } else {
      this.emitter.removeListener(eventName, handler);
    }
  }
}

let appDispatcher = new AppDispatcher();

export default appDispatcher;
