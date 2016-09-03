'use strict';

const ValidatorUtil = require('../util/validator-util');
const Model = require('../model/model');

module.exports = class InputHeightModel extends Model {
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
    if (errorMessage !== null) {
      this._trigger('invalid', errorMessage);
      return;
    }

    localStorage.setItem('height', height);
    this._trigger('change');
  }
};
