'use strict';

const WeightListModel = require('../model/weight-list-model.js');

class AppController {
  constructor(appModel, weightListModel, updateWeightModel) {
    this._appModel = appModel;
    this._weightListModel = weightListModel;
    this._updateWeightModel = updateWeightModel;
  }

  readAll() {
    this._weightListModel.readAll();
  }

  changeUpdateMode(param) {
    this._updateWeightModel.updateWeight(param);
  }
}

module.exports = AppController;
