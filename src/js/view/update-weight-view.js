'use strict';

const {ipcRenderer} = require('electron');

const DomUtil = require('../util/dom-util');
const View = require('../view/view');

module.exports = class UpdateWeightView extends View{
  constructor(updateWeightController, updateWeightModel) {
    super();
    this._updateWeightController = updateWeightController;
    this._updateWeightModel = updateWeightModel;

    this._setEl({
      'updateDate': '_$updateDate',
      'updateWeight': '_$updateWeight'
    });

    this._setEvent({
      'click cancelButton': this._onClickCancelButton,
      'click removeButton': this._onClickRemoveButton,
      'click updateButton': this._onClickUpdateButton
    });

    this._setAppEvent(this._updateWeightModel, {
      'initView': this._initView,
      'update': this._update,
      'remove': this._remove
    });

    this._init();
  }

  _init() {
    this._updateWeightController.init();

    ipcRenderer.on('shown_update_window', (event, param) => {
      this._updateWeightController.initView(param);
    });
  }

  _initView() {
    this._$updateDate.innerText = this._updateWeightModel.date;
    this._$updateWeight.value = this._updateWeightModel.weight;
  }

  _onClickCancelButton() {
    ipcRenderer.send('close_update_window');
  }

  _onClickRemoveButton() {
    if (confirm('削除しますか？')) this._updateWeightController.remove();
  }

  _onClickUpdateButton() {
    const weight = this._$updateWeight.value;
    this._updateWeightController.update(weight);
  }

  _remove() {
    ipcRenderer.send('close_update_window');
  }

  _update(message) {
    if (message) {
      alert(message);
    }
  }
};
