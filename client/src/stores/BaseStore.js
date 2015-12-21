import { EventEmitter } from 'events';

export default class BaseStore extends EventEmitter {

  constructor(...args) {
    super(...args);
    this.data = new Set([]);
  }

  setAll(items) {
    this.data = new Set(items);
    console.log('BASE SET ALL, calling emit change', this, this.emitChange);
    this.emitChange();
  }

  getAll() {
    return Array.from(this.data);
  }

  set(item) {
    this.data.add(item);
    this.emitChange();
  }

  remove(item) {
    this.data.delete(item);
    this.emitChange();
  }

  isDirty() {
    return this._dirty;
  }
}
