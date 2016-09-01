'use strict';

const {ipcRenderer} = require('electron');

const DomUtil = require('../util/dom-util');
const View = require('../view/view');

module.exports = class UpdateView extends View{
  constructor(updateController, updateModel) {
    super();
    this._updateController = updateController;
    this._updateModel = updateModel;

    this._setEl({
      'updateDate': '_$updateDate',
      'updateWeight': '_$updateWeight'
    });

    this._setEvent({
      'click cancelButton': this._onClickCancelButton,
      'click removeButton': this._onClickRemoveButton,
      'click updateButton': this._onClickUpdateButton
    });

    this._setAppEvent(this._updateModel, {
      'initView': this._initView,
      'remove': this._remove
    });

    this._init();
  }

  _init() {
    this._updateController.init();

    ipcRenderer.on('shown_update_window', (event, param) => {
      this._updateController.initView(param);
    });
  }

  _initView() {
    this._$updateDate.innerText = this._updateModel.date;
    this._$updateWeight.value = this._updateModel.weight;
  }

  _onClickCancelButton() {
    ipcRenderer.send('close_update_window');
  }

  _onClickRemoveButton() {
    if (confirm('削除しますか？')) this._updateController.remove();
  }

  _onClickUpdateButton() {
  }

  _remove() {
    alert('削除しました');
    ipcRenderer.send('close_update_window');
  }
};
