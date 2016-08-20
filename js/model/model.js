'use strict';

// http://ja.stackoverflow.com/questions/9041/javascript%E3%81%A7dom%E4%BB%A5%E5%A4%96%E3%81%AE%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%82%92%E5%AE%9F%E8%A3%85%E3%81%99%E3%82%8B%E3%81%AB%E3%81%AF
class Model {
  constructor() {
    this._attributeList = {};
    this._handlerList = {};
  }

  get(key) {
    return this._attributeList[key];
  }

  set(key, value) {
    this._attributeList[key] = value;
  }

  on(event, handler) {
    (this._handlerList[event] || (this._handlerList[event] = [])).push(handler);
  }

  _trigger(event, argList) {
    const list = this._handlerList[event];
    if (list) {
      list.forEach(handler => {
        handler(argList);
      });
    }
  }
}

module.exports = Model;
