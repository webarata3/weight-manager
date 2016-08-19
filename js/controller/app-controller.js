'use strict';

const WeightListModel = require('../model/weight-list-model');

class AppController {
  constructor(weightListModel) {
    this._weightListModel = weightListModel;
  }

  readAll() {
    this._weightListModel.readAll();
  }
}

module.exports = AppController;
