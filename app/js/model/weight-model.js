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

  static insert(weight) {
    return WeightDao.getInstance().then(weightDao => {
      return weightDao.insert(weight);
    }).catch(event => {
      throw new Error(event);
    });
  }

  static update(weight) {
    return WeightDao.getInstance().then(weightDao => {
      return weightDao.update(weight);
    }).catch(evnet => {
      throw new Error(Event);
    });
  }

  static remove(weight) {
    return WeightDao.getInstance().then(weightDao => {
      return weightDao.remove(weight.date);
    }).catch(event => {
      throw new Error(event);
    });
  }
};
