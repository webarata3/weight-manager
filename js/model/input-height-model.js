'use strict';

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

const ValidatorUtil = require('../util/validator-util.js');
const Model = require('../model/model.js');

class InputHeightModel extends Model {
  constructor() {
    super();
  }

  init() {
    let height = localStorage.getItem('height') || '';
    this.changeHeight(height);
  }

  changeHeight(height) {
    this.set('height', height);

    const errorMessage = ValidatorUtil.checkHeight(height);
    if (errorMessage != null) {
      this._trigger('invalid', errorMessage);
      return
    }

    localStorage.setItem('height', height);
    this._trigger('change')
  }
}

module.exports = InputHeightModel;
