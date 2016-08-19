'use strict';

class View {
  constructor() {
  }

  _setEl(elList) {
    for (let key in elList) {
      if (elList.hasOwnProperty(key)) {
        this[elList[key]] = document.getElementById(key);
      }
    }
  }

  _setEvent(eventList) {
    for (let key in eventList) {
      if (eventList.hasOwnProperty(key)) {
        const callback = eventList[key];
        const keys = key.split(' ');

        document.getElementById(keys[1]).addEventListener(keys[0], () => {
          callback.apply(this);
        });
      }
    }
  }

  _setAppEvent(model, eventList) {
    for (let key in eventList) {
      if (eventList.hasOwnProperty(key)) {
        const callback = eventList[key];
        model.on(key, argList => {
          callback.call(this, argList);
        });
      }
    }
  }
}

module.exports = View;