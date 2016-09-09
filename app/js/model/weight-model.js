'use strict';

const moment = require('moment');
const HeightDao = require('../dao/height-dao');
const WeightDao = require('../dao/weight-dao');
const WeightUtil = require('../util/weight-util');

module.exports = class WeightModel {
  static readAll() {
    return WeightDao.getInstance().then(weightDao => {
      return weightDao.readAll();
    }).then((weightList) => {
      const height = HeightDao.getHeight();
      return WeightUtil.formatWeightList(height, weightList);
    }).catch((event) => {
      throw new Error(event);
    });
  }

  static insert(date, weight) {
    const formatDate = date.split('-').join('');
    return WeightDao.getInstance().then(weightDao => {
      return weightDao.insert({date: formatDate, weight: weight});
    }).catch(event => {
      throw new Error(event);
    });
  }

  static update(date, weight) {
    return WeightDao.getInstance().then(weightDao => {
      return weightDao.update(date, weight);
    }).catch(event => {
      reject(event);
    });
  }

  static remove(date) {
    return WeightDao.getInstance().then(weightDao => {
      return weightDao.remove(date.split('/').join(''));
    }).catch(event => {
      throw new Error(event);
    });
  }
};
