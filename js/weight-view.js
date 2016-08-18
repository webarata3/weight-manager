'use strict';

const appValidator = require('../js/app-validator.js');
const ModelEvent = require('../js/weight-model-event.js');

class View {
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

      'updateFieldset': '_$updateFiledset',

      'weightTable': '_$weightTable'
    });

    this._setEvent({
      'input height': this._onInputHeight,
      'click insertButton': this._onClickInsertButton
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

  /**
   * モデルからの通知を受け取る
   */
  notify(modelEvent) {
    console.log('event=',  modelEvent);

    switch (modelEvent) {
      case ModelEvent.FINISH_INIT:
        this._controller.renderWeightList();
        break;
      case ModelEvent.FINISH_READ_ALL:
        this.renderWeightList();
        break;
      case ModelEvent.CHANGE_HEIGHT:
        this.changeHeight();
        break;
      case ModelEvent.FINISH_INSERT:
        this.insertWeight();
        break;
    }
  }

  _onInputHeight() {
    this._controller.inputHeight(this._$height.value);
  }

  _onClickInsertButton() {
    this._controller.insertWeight(this._$insertDate.value, this._$insertWeight.value);
  }

  changeHeight() {
    this._setHeightErrorMessage();
    if (Object.keys(this._model._lastErrorMessageList).length === 0) {
      localStorage.setItem('height', this._model.height);
      this._controller.renderWeightList();
    }
  }

  _setHeightErrorMessage() {
    this._setFieldError(this._$height, this._model.lastErrorMessageList.heightError);
  }

  renderWeightList() {
    this._$weightTable.innerHTML = '';

    const height = localStorage.getItem('height');

    if (height == null) return;

    this._$height.value = height;

    let beforeWeight = 0;
    let diffWeight = 0;

    this._model.weightList.forEach(currentValue => {
      const weight = Number.parseFloat(currentValue.weight);
      const bmi = Number.parseFloat(weight / (height * height / 10000));
      diffWeight = Number.parseFloat(beforeWeight === 0 ? 0 : weight - beforeWeight);
      beforeWeight = weight;
      const $trEl = document.createElement('tr');
      $trEl.innerHTML = `
          <td>${currentValue.date}</td>
          <td class="number">${weight.toFixed(1)} kg</td>
          <td class="number">${diffWeight.toFixed(1)} kg</td>
          <td class="number">${bmi.toFixed(1)}</td>
          <td><button class="btn btn-mini btn-positive">変更・削除</button></td>`;
      this._$weightTable.appendChild($trEl);

      $trEl.getElementsByTagName('button')[0].addEventListener('click', () => {
        controller.setChangeMode(currentValue.date.split('/').join('-'), weight);
      });
    });
  }

  insertWeight() {
    this._setInsertErrorMessage();
    if (Object.keys(this._model.lastErrorMessageList).length === 0) {
      this._clearInsertForm();
      this._clearInsertError();
      this._controller.renderWeightList();
    }
  }

  _setInsertErrorMessage() {
    if (this._model.lastErrorMessageList.insertError != null) {
      this._$insertError.innerText = this._model.lastErrorMessageList.insertError;
    }
    this._setFieldError(this._$insertDate, this._model.lastErrorMessageList.insertDateError);
    this._setFieldError(this._$insertWeight, this._model.lastErrorMessageList.insertWeightError);
  }

  _setFieldError($el, message) {
    // エラーメッセージを除去する
    const $checkEl = $el.nextSibling;

    if ($checkEl.nodeType === Node.ELEMENT_NODE) {
      if ($checkEl.getAttribute('class') === View.ERROR_MESSAGE_STYLE) {
        $checkEl.parentNode.removeChild($checkEl);
      }
    }
    if (message == null) {
      $el.classList.remove(View.ERROR_STYLE);
    } else {
      $el.classList.add(View.ERROR_STYLE);

      var $message = document.createElement('span');
      $message.textContent = message;
      $message.classList.add(View.ERROR_MESSAGE_STYLE);
      $el.parentNode.insertBefore($message, $el.nextSibling);
    }
  };

  _clearInsertError() {
    this._$insertError.innerText = '';
    const $errorEl = this._$insertFieldset.getElementsByClassName(View.ERROR_MESSAGE_STYLE);
    for (let i = 0; i < $errorEl.length; i++) {
      if ($errorEl[i].id === 'insertError') continue;
      $errorEl[i].parentNode.removeChild($errorEl[i]);
    }
  }

  _clearInsertForm() {
    this._$insertDate.value = '';
    this._$insertWeight.value = '';
  }
}

View.ERROR_STYLE = 'validationError';
View.ERROR_MESSAGE_STYLE = 'errorMessage';


module.exports = View;
