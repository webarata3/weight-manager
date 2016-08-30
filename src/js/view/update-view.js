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

    this._setAppEvent(this._inputHeightModel, {
//      'change': this._change,
 //     'invalid': this._invalid
    });

    this._init();
  }

  _init() {
    this._updateController.init();

    ipcRenderer.on('shown_update_window', (event, param) => {
      this._onShownUpdateWindow(param);
    });
  }

  _onShownUpdateWindow(param) {

  }

  _onClickCancelButton() {
    ipcRenderer.send('close_update_window');
  }

  _onClickRemoveButton() {
  }

  _onClickUpdateButton() {
  }
};
