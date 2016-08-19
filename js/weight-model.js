'use strict';

const AppValidator = require('../js/app-validator.js');
const ModelEvent = require('../js/weight-model-event.js');
const WeightDao = require('../js/weight-dao.js');

class WeightModel {
  constructor(attrs) {
    this._attributes = attrs || {};
  }
}

class Model {
  constructor() {
    this._appValidator = new AppValidator();

    this._height = '';
    this._lastErrorMessageList = {};
    this._observerList = [];
  }

  // コンストラクタのタイミングでイベントを発火できないため
  init() {
    this._dao = new WeightDao();
    this._dao.init().then(() => {
      this._notify(ModelEvent.FINISH_INIT);
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

  get updateDate() {
    return this._updateDate;
  }

  get updateWeight() {
    return this._updateWeight;
  }

  inputHeight(height) {
    this._height = height;
    this._lastErrorMessageList = {};
    let validHeight = this._appValidator.validRequired(height);
    if (validHeight == null) {
      validHeight = this._appValidator.validHeight(height)
    }
    if (validHeight != null) {
      this._lastErrorMessageList.heightError = validHeight;
      this._notify(ModelEvent.CHANGE_HEIGHT);
      return;
    }
    this._notify(ModelEvent.CHANGE_HEIGHT);
  }

  readAllWeightList() {
    this._dao.readAll().then((weightList) => {
      this._weightList = weightList;
      this._notify(ModelEvent.FINISH_READ_ALL);
    }).catch((event) => {
      // TODO
      console.log('error', event);
    });
  }

  insertWeight(date, weight) {
    this._lastErrorMessageList = {};
    let validDate = this._appValidator.validRequired(date);
    if (validDate == null) {
      validDate = this._appValidator.validDate(date)
    }
    if (validDate != null) {
      this._lastErrorMessageList.insertDateError = validDate;
    }

    let validWeight = this._appValidator.validRequired(weight);
    if (validWeight == null) {
      validWeight = this._appValidator.validWeight(weight)
    }
    if (validWeight != null) {
      this._lastErrorMessageList.insertWeightError = validWeight;
    }

    if (validDate != null || validWeight != null) {
      this._notify(ModelEvent.FINISH_INSERT);
      return;
    }

    const formatDate = moment(date).format('YYYYMMDD');
    this._dao.insert(formatDate, weight).then(insertStatus => {
      if (insertStatus === WeightDao.DUPLICATE) {
        this._lastErrorMessageList.insertError = '指定の日の体重は登録済みです';
      }
      this._notify(ModelEvent.FINISH_INSERT);
    }).catch((event) => {
      // TODO
      console.log(event);
      console.log('error');
    });
  }

  changeUpdateMode(date, weight) {
    this._updateDate = date;
    this._updateWeight = weight;

    this._notify(ModelEvent.CHANGE_UPDATE_MODE);
  }

  changeInsertMode() {
    this._notify(ModelEvent.CHANGE_INSERT_MODE);
  }

  deleteWeight() {
    this._dao.delete(this._updateDate.split('/').join('')).then(() => {
      this._notify(ModelEvent.FINISH_DELETE);
    }).catch(() => {
    });
  }

  updateWeight2(weight) {
    if (true) {
      const formatDate = moment(this._updateDate.split('/').join('-')).format('YYYYMMDD');
      this._dao.update(formatDate, weight).then(updateStatus => {
        if (updateStatus === WeightDao.NOT_EXIST) {
          this._lastErrorMessageList.updateError = '指定の日の体重は削除されています';
        } else {
          this._notify(ModelEvent.FINISH_UPDATE);
        }
      }).catch((event) => {
        // TODO
        console.log('error', event);
      });
    }
  }
}

module.exports = Model;
