'use strict';

const DomUtil = require('../util/dom-util.js');
const View = require('../view/view.js');

class UpdateWeightView extends View {
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
      'initUpdate': this._initUpdate,
      'invalid': this._invalid
    });

    this._init();
  }

  _init() {
    this._updateWeightController.init();
  }

  _onClickCancelButton() {
  }

  _onClickDeleteButton() {
  }

  _onClickUpdateButton() {
  }

  _initUpdate(param) {
    this._$updateDate.innerText = param.date;
    this._$updateWeight.value = param.weight;
  }

  _dispUpdateMode(param) {
    console.log('update');
  }
}

module.exports = UpdateWeightView;
