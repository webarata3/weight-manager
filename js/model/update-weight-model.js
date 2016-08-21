'use strict';

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

const ValidatorUtil = require('../util/validator-util.js');
const Model = require('../model/model.js');
const WeightDao = require('../dao/weight-dao.js');

class UpdateWeightModel extends Model {
  constructor() {
    super();
  }

  init() {
  }

  updateWeight(param) {
    this._trigger('initUpdate', param);
  }
}

module.exports = UpdateWeightModel;
