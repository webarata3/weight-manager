'use strict';

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

const ValidatorUtil = require('../util/validator-util');
const Model = require('../model/model');
const WeightDao = require('../dao/weight-dao');

module.exports = class UpdateWeightModel extends Model {
  constructor() {
    super();
  }

  init() {
  }

  updateWeight(param) {
    this._trigger('initUpdate', param);
  }

  cancel() {
    this._trigger('changeInsertMode');
  }

  update(date, weight) {
    const errorMessageMap = {};
    let errorMessage = ValidatorUtil.checkWeight(weight);
    if (errorMessage !== null) {
      errorMessageMap['updateWeight'] = errorMessage;
    }
    if (Object.keys(errorMessageMap).length !== 0) {
      this._trigger('invalid', errorMessageMap);
      return;
    }

    const weightDao = new WeightDao();
    const promise = Promise.resolve();
    promise.then(() => {
      return weightDao.init();
    }).then(() => {
      const formatDate = moment(date.split('/').join('-')).format('YYYYMMDD');
      return weightDao.update(formatDate, weight);
    }).then(status => {
      if (status === WeightDao.NOT_EXIST) {
        this._trigger('update', '指定の日の体重は削除されています');
      } else {
        this._trigger('update');
      }
    }).catch(error => {
      throw new Error(error);
    });
  }

  remove(date) {
    const weightDao = new WeightDao();
    const promise = Promise.resolve();
    promise.then(() => {
      return weightDao.init();
    }).then(() => {
      return weightDao.remove(date.split('/').join(''));
    }).then(() => {
      this._trigger('remove');
    }).catch(error => {
      throw new Error(error);
    });
  }
};
