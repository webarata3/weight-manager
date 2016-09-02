'use strict';

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

  initView(param) {
    this.date = param.date;
    this.weight = param.weight;
    this._trigger('initView');
  }

  update(weight) {
    this.weight = weight;
    const errorMessageMap = {};
    let errorMessage = ValidatorUtil.checkWeight(this.weight.toString());
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
      const formatDate = moment(this.date.split('/').join('-')).format('YYYYMMDD');
      return weightDao.update(formatDate, this.weight);
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

  remove() {
    const formatYYYYMMDD = moment(this.date.split('/').join('-')).format('YYYYMMDD');
    const weightDao = new WeightDao();
    const promise = Promise.resolve();
    promise.then(() => {
      return weightDao.init();
    }).then(() => {
      return weightDao.remove(formatYYYYMMDD);
    }).then((status) => {
      this._trigger('remove');
    }).catch(error => {
      throw new Error(error);
    });
  }
};
