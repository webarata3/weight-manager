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


/*
 appValidator.ERROR_STYLE = 'validationError';
 appValidator.ERROR_MESSAGE_STYLE = 'errorMessage';

 appValidator.checkHeight = ($height) => {
 const value = $height.value;
 const message = appValidator.validation(value, [appValidator.requireValidator, appValidator.heightValidator]);
 appValidator.setError($height, message);

 return message == null;
 };

 appValidator.checkWeight = ($weight) => {
 const value = $weight.value;
 const message = appValidator.validation(value, [appValidator.requireValidator, appValidator.weightValidator]);
 appValidator.setError($weight, message);

 return message == null;
 };

 appValidator.checkDate = ($date) => {
 const value = $date.value;
 const message = appValidator.validation(value, [appValidator.requireValidator, appValidator.dateValidator]);
 appValidator.setError($date, message);

 return message == null;
 };

 appValidator.setError = ($el, message) => {
 // エラーメッセージを除去する
 const $checkEl = $el.nextSibling;

 if ($checkEl.nodeType === Node.ELEMENT_NODE) {
 if ($checkEl.getAttribute('class') === appValidator.ERROR_MESSAGE_STYLE) {
 $checkEl.parentNode.removeChild($checkEl);
 }
 }
 if (message == null) {
 $el.classList.remove(appValidator.ERROR_STYLE);
 } else {
 $el.classList.add(appValidator.ERROR_STYLE);

 var $message = document.createElement('span');
 $message.textContent = message;
 $message.classList.add(appValidator.ERROR_MESSAGE_STYLE);
 $el.parentNode.insertBefore($message, $el.nextSibling);
 }
 };

 appValidator.validation = (value, validatorList) => {
 let message = null;
 validatorList.some(valid => {
 message = valid(value);
 return message != null;
 });
 return message;
 };

 // validator実装
 appValidator.requireValidator = (value) => {
 return validator.isNull(value) ? '必須入力です' : null;
 };

 appValidator.heightValidator = (value) => {
 return validator.isFloat(value, {min: 0.1, max: 300}) ? null : '0.1〜300の間の数値を入力してください';
 };

 appValidator.weightValidator = (value) => {
 return validator.isFloat(value, {min: 0.1, max: 300}) ? null : '0.1〜500の間の数値を入力してください';
 };

 appValidator.dateValidator = (value) => {
 // TODO バグ
 return validator.isDate(value) ? null : '日付を入力してください';
 };
 */
