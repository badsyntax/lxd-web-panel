import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ContainerModel from '../../../models/Container';

import {
  CONTAINERS__UPDATED,
  CONTAINERS__GET_SUCCESS
} from '../constants/AppConstants';

class ContainerStore extends BaseStore {

  emitChange() {
    this.emit(CONTAINERS__UPDATED);
  }

  addChangeListener(callback) {
    this.on(CONTAINERS__UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CONTAINERS__UPDATED, callback);
  }

  set(container) {
    return super.set(new ContainerModel(container));
  }

  setAll(containers) {
    super.setAll(containers.map((container) => new ContainerModel(container)));
  }
}

let store = new ContainerStore();

AppDispatcher.on(CONTAINERS__GET_SUCCESS, (action) => store.setAll(action.containers));

export default store;
