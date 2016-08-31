'use strict';

module.exports = class DomUtil {
  /**
   * @returns {string}
   */
  static get ERROR_MESSAGE() {
    return 'errorMessage';
  }

  /**
   * @returns {string}
   */
  static get VALIDATION_ERROR() {
    return 'validationError';
  }

  static _removeFieldError($el) {
    const $checkEl = $el.nextSibling;

    if ($checkEl.nodeType === Node.ELEMENT_NODE) {
      if ($checkEl.getAttribute('class') === DomUtil.ERROR_MESSAGE) {
        $checkEl.parentNode.removeChild($checkEl);
      }
    }
    if ($el.classList.contains(DomUtil.VALIDATION_ERROR)) {
      $el.classList.remove(DomUtil.VALIDATION_ERROR);
    }
  }

  static _setFieldError($el, message) {
    DomUtil._removeFieldError($el);

    if (message === null) {
      $el.classList.remove(DomUtil.VALIDATION_ERROR);
    } else {
      $el.classList.add(DomUtil.VALIDATION_ERROR);

      var $message = document.createElement('span');
      $message.textContent = message;
      $message.classList.add(DomUtil.ERROR_MESSAGE);
      $el.parentNode.insertBefore($message, $el.nextSibling);
    }
  }
};