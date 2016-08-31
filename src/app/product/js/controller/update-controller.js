'use strict';

const ipcRenderer = require('electron');

const WeightListModel = require('../model/xxupdate-model');

module.exports = class UpdateController {
  constructor(updateModel) {
    this._updateModel = updateModel;
  }

  init() {
  }

  initView(param){

  }
};
