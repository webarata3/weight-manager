'use strict';

const {ipcRenderer} = require('electron');

module.exports = class WeightListController {
  constructor(weightListModel) {
    this._weightListModel = weightListModel;
  }

  init() {
    this._weightListModel.init();
  }

  readAll() {
    this._weightListModel.readAll();
  }

  showUpdateWindw(param) {
    ipcRenderer.send('show_update_window', param);
  }
};
