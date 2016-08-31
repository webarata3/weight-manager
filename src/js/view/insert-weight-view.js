'use strict';

const DomUtil = require('../util/dom-util');
const View = require('../view/view');

module.exports = class InsertWeightView extends View{
  constructor(insertWeightController, insertWeightModel) {
    super();
    this._insertWeightController = insertWeightController;
    this._insertWeightModel = insertWeightModel;

    this._setEl({
      'insertDate': '_$insertDate',
      'insertWeight': '_$insertWeight',
      'insertButton': '_$insertButton',
      'insertError': '_$insertError'
    });

    this._setEvent({
      'click insertButton': this._onClickInsertButton
    });

    this._setAppEvent(this._insertWeightModel, {
      'insert': this._insert,
      'invalid': this._invalid
    });

    this._init();
  }

  _init() {
    this._insertWeightController.init();
  }

  _onClickInsertButton() {
    this._$insertError.innerText = '';
    DomUtil._removeFieldError(this._$insertDate);
    DomUtil._removeFieldError(this._$insertWeight);
    this._insertWeightController.insertWeight(
      this._$insertDate.value,
      this._$insertWeight.value
    );
  }

  _insert(errorMessage) {
    if (errorMessage) {
      this._$insertError.innerText = errorMessage;
    }
  }

  _invalid(errorMessageMap) {
    DomUtil._setFieldError(this._$insertDate,  errorMessageMap.insertDate);
    DomUtil._setFieldError(this._$insertWeight,  errorMessageMap.insertWeight);
  }
};
