'use strict';

const ValidatorUtil = require('../util/validator-util');
const Model = require('../model/model');

module.exports = class UpdateModel extends Model {
  constructor() {
    super();
  }

  init() {
  }

  remove(date) {
    console.log(date);
    const formatYYYYMMDD = moment(date.split('/').join('-')).format('YYYYMMDD');
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
