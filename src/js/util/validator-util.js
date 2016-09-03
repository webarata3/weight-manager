'use strict';

// https://www.npmjs.com/package/validator
const validator = require('validator');

module.exports = class ValidatorUtil {
  static validatorList(value, validList) {
    let message = null;
    validList.some((valid) => {
      message = valid(value);
      return message !== null;
    });
    return message;
  }

  static validRequired(value) {
    return validator.isNull(value) ? '必須入力です' : null;
  }

  static validDecimal(value) {
    const pattern = /^([1-9]\d*|0)(\.\d+)?$/;
    return pattern.test(value) ? null : '数値のみ入力してください';
  }

  static validHeight(value) {
    return validator.isFloat(value, {min: 0.1, max: 300}) ? null : '0.1〜300の間の数値を入力してください';
  }
};
