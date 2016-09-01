'use strict';

const ipcRenderer = require('electron');

module.exports = class UpdateWeightController {
  constructor(ypdateWeightModel) {
    this._updateWeightModel = ypdateWeightModel;
  }

  init() {
  }

  initView(param){
    this._updateWeightModel.initView(param);
  }

  remove() {
    this._updateWeightModel.remove();
  }
};
