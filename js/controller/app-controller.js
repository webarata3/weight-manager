'use strict';

const WeightListModel = require('../model/weight-list-model.js');

class AppController {
  constructor(weightListModel) {
    this._weightListModel = weightListModel;
  }

  readAll() {
    // 消す
    this._weightListModel.readAll();
  }
}

module.exports = AppController;
