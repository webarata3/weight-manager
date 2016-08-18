'use strict';

const AppValidator = require('../js/app-validator.js');
const ModelEvnet = require('../js/weight-model-event.js');
const WeightDao = require('../js/weight-dao.js');

class Model {
  constructor() {
    this._appValidator = new AppValidator();

    this._height = '';
    this._lastErrorMessageList = {};
    this._observerList = [];

    this._dao = new WeightDao();
    this._dao.init().then(() => {
      this._notify(ModelEvnet.FINISH_INIT);
    }).catch();
  }

  addObserver(observer) {
    this._observerList.push(observer);
  }

  removeObserver(observer) {
    for (var i = 0, len = this._observerList.length; i < len; i++) {
      if (this._observerList[i] === observer) {
        this._observerList.splice(i, 1);
      }
    }
  }

  _notify(modelEvent) {
    for (var i = 0, len = this._observerList.length; i < len; i++) {
      this._observerList[i].notify(modelEvent);
    }
  }

  get height() {
    return this._height;
  }

  get lastErrorMessageList() {
    return this._lastErrorMessageList;
  }

  get weightList() {
    return this._weightList;
  }

  inputHeight(height) {
    this._height = height;
    this._lastErrorMessageList = {};
    let validHeight = this._appValidator.requiredValidator(height);
    if (validHeight == null) {
      validHeight = this._appValidator.heightValidator(height)
    }
    if (validHeight != null) {
      this._lastErrorMessageList.heightError = validHeight;
      this._notify(ModelEvnet.CHANGE_HEIGHT);
      return;
    }
    this._notify(ModelEvnet.CHANGE_HEIGHT);
  }

  readAllWeightList() {
    this._dao.readAll().then((weightList) => {
      this._weightList = weightList;
      this._notify(ModelEvnet.FINISH_READ_ALL);
    }).catch((event) => {
      // TODO
      console.log('error', event);
    });
  }
}

module
  .exports = Model;
