'use strict';

// https://www.npmjs.com/package/validator
const validator = require('validator');

class AppValidator {
  validInsert() {
    const errorList = [];

    if (this._requireValidator()) {
      return validator.isNull(value) ? '必須入力です' : null;
    }
  }

  validRequired(value) {
    return validator.isNull(value) ? '必須入力です' : null;
  }

  validHeight(value) {
    return validator.isFloat(value, {min: 0.1, max: 300}) ? null : '0.1〜300の間の数値を入力してください';
  }

  validWeight(value) {
    return validator.isFloat(value, {min: 0.1, max: 500}) ? null : '0.1〜500の間の数値を入力してください';
  }

  validDate(value) {
    // TODO バグ
    return validator.isDate(value) ? null : '日付を入力してください';
  };
}

module.exports = AppValidator;
