'use strict';

// https://www.npmjs.com/package/validator
const validator = require('validator');

const ERROR_STYLE = 'validationError';
const ERROR_MESSAGE_STYLE = 'errorMessage';

function checkHeight($height) {
  const value = $height.value;
  const message = validation(value, [requireValidator, heightValidator]);
  setError($height, message);

  return message == null;
}

function checkWeight($weight) {
  const value = $weight.value;
  const message = validation(value, [requireValidator, weightValidator]);
  setError($weight, message);

  return message == null;
}

function checkDate($date) {
  const value = $date.value;
  const message = validation(value, [requireValidator, dateValidator]);
  setError($date, message);

  return message == null;
}


function setError($el, message) {
  // エラーメッセージを除去する
  const $checkEl = $el.nextSibling;

  if ($checkEl.nodeType === Node.ELEMENT_NODE) {
    if ($checkEl.getAttribute('class') === ERROR_MESSAGE_STYLE) {
      $checkEl.parentNode.removeChild($checkEl);
    }
  }
  if (message == null) {
    $el.classList.remove(ERROR_STYLE);
  } else {
    $el.classList.add(ERROR_STYLE);

    var $message = document.createElement('span');
    $message.textContent = message;
    $message.classList.add(ERROR_MESSAGE_STYLE);
    $el.parentNode.insertBefore($message, $el.nextSibling);
  }
}

function validation(value, validatorList) {
  let message = null;
  validatorList.some(valid => {
    message = valid(value);
    return message != null;
  });
  return message;
}

// validator実装
function requireValidator(value) {
  return validator.isNull(value) ? '必須入力です' : null;
}

function heightValidator(value) {
  return validator.isFloat(value, {min: 0.1, max: 300}) ? null : '0.1〜300の間の数値を入力してください';
}

function weightValidator(value) {
  return validator.isFloat(value, {min: 0.1, max: 300}) ? null : '0.1〜500の間の数値を入力してください';
}

function dateValidator(value) {
  return validator.isDate('value') ? '日付を入力してください' : null;
}