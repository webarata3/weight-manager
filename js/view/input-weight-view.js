'use strict';

class InputWeightView {
  constructor(controller, model) {
    this._controller = controller;
    this._model = model;

    this._setEl({
      'height': '_$height',

      'insertError': '_$insertError',
      'insertDate': '_$insertDate',
      'insertWeight': '_$insertWeight',

      'insertFieldset': '_$insertFieldset',

      'updateError': '_$updateError',
      'updateDate': '_$updateDate',
      'updateWeight': '_$updateWeight',

      'updateFieldset': '_$updateFieldset',

      'weightTable': '_$weightTable'
    });

    this._setEvent({
      'input height': this._onInputHeight,
      'click insertButton': this._onClickInsertButton,
      'click cancelButton': this._onClickCancelButton,
      'click updateButton': this._onClickUpdateButton,
      'click deleteButton': this._onClickDeleteButton,
    });

    model.addObserver(this);
    model.init();
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

        const self = this;
        document.getElementById(keys[1]).addEventListener(keys[0], () => {
            callback.apply(self);
          }
        );
      }
    }
  }
}

module.exports = InputWeightView;
