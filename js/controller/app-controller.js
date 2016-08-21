'use strict';

const WeightListModel = require('../model/weight-list-model.js');

class AppController {
  constructor(appModel, weightListController, updateWeightController) {
    this._appModel = appModel;
    this._weightListController = weightListController;
    this._updateWeightController = updateWeightController;
  }

  readAll() {
    this._weightListController.readAll();
  }

  changeUpdateMode(param) {
    this._updateWeightController.updateWeight(param);
  }
}

module.exports = AppController;
