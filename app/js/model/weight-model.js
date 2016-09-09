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
    const formatYYYYMMDD = moment(date).format('YYYYMMDD');
    const weightDao = new WeightDao();
    const promise = Promise.resolve();
    return promise.then(() => {
      return weightDao.init();
    }).then(() => {
      return weightDao.insert(formatYYYYMMDD, weight);
    }).catch(event => {
      throw new Error(event);
    });
  }

  static update(date, weight) {
    const weightDao = new WeightDao();

    return new Promise((resolve, reject) => {
      weightDao.init().then(() => {
        weightDao.update(date, weight);
      }).catch(event => {
        reject(event);
      });
    });
  }

  static remove(date) {
    const weightDao = new WeightDao();
    const promise = Promise.resolve();
    return promise.then(() => {
      return weightDao.init();
    }).then(() => {
      return weightDao.remove(date.split('/').join(''));
    }).catch(event => {
      throw new Error(event);
    });
  }
};
