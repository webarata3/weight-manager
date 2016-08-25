'use strict';

const DomUtil = require('../util/dom-util');
const View = require('../view/view');

module.exports = class UpdateWeightView extends View {
  constructor(updateWeightController, updateWeightModel) {
    super();
    this._updateWeightController = updateWeightController;
    this._updateWeightModel = updateWeightModel;

    this._setEl({
      'updateDate': '_$updateDate',
      'updateWeight': '_$updateWeight',
      'updateButton': '_$updateButton',
      'updateError': '_$updateError'
    });

    this._setEvent({
      'click cancelButton': this._onClickCancelButton,
      'click updateButton': this._onClickUpdateButton,
      'click deleteButton': this._onClickDeleteButton
    });

    this._setAppEvent(this._updateWeightModel, {
      update: this._update,
      'initUpdate': this._initUpdate,
      'invalid': this._invalid
    });

    this._init();
  }

  _init() {
    this._updateWeightController.init();
  }

  _onClickCancelButton() {
    this._updateWeightController.cancel();
  }

  _onClickUpdateButton() {
    this._$updateError.innerText = '';
    DomUtil._removeFieldError(this._$updateWeight);

    const date = this._$updateDate.innerText;
    const weight = this._$updateWeight.value;

    this._updateWeightController.update(date, weight);
  }

  _onClickDeleteButton() {
    const date = this._$updateDate.innerText;
    this._updateWeightController.remove(date);
  }

  _update(errorMessage) {
    if (errorMessage) {
      this._$updateError.innerText = errorMessage;
    }
  }

  _initUpdate(param) {
    this._$updateDate.innerText = param.date;
    this._$updateWeight.value = param.weight;
  }

  _dispUpdateMode(param) {
  }

  _invalid(errorMessageMap) {
    DomUtil._setFieldError(this._$updateWeight, errorMessageMap.updateWeight);
  }
};
