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
