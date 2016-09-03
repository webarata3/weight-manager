'use strict';

// https://www.npmjs.com/package/validator
const validator = require('validator');

module.exports = class ValidatorUtil {
  static validationHeight(value) {
    return ValidatorUtil.validatorList(value, [
      ValidatorUtil.validRequired,
      ValidatorUtil.validDecimal,
      ValidatorUtil.validHeight
    ]);
  }

  static validationDate(value) {
    return ValidatorUtil.validatorList(value, [
      ValidatorUtil.validRequired,
      ValidatorUtil.validDate
    ]);
  }

  static validationWeight(value) {
    return ValidatorUtil.validatorList(value, [
      ValidatorUtil.validRequired,
      ValidatorUtil.validDecimal,
      ValidatorUtil.validWeight
    ]);
  }

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

  static validWeight(value) {
    return validator.isFloat(value, {min: 0.1, max: 500}) ? null : '0.1〜500の間の数値を入力してください';
  }

  static validDate(value) {
    return validator.isDate(value) ? null : '日付を入力してください';
  }
};
