'use strict';

const moment = require('moment');
const WeightDao = require('../dao/weight-dao');
const HeightDao = require('../dao/height-dao');
const WeightUtil = require('../util/weight-util');

module.exports = class WeightModel {
  static readAll() {
    const weightDao = new WeightDao();

    const promise = Promise.resolve();
    return promise.then(() => {
      return weightDao.init();
    }).then(() => {
      return weightDao.readAll();
    }).then((weightList) => {
      const height = HeightDao.getHeight();
      return WeightUtil.formatWeightList(height, weightList);
    }).catch((event) => {
      throw new Error(event);
    });
  }
};
