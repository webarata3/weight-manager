'use strict';

const WeightListModel = require('../model/weight-list-model');

module.exports = class IndexController {
  constructor(indexModel, weightListController, updateWeightController) {
    this._indexModel = indexModel;
    this._weightListController = weightListController;
    this._updateWeightController = updateWeightController;
  }

  readAll() {
    this._weightListController.readAll();
  }

  changeUpdateMode(param) {
    this._updateWeightController.updateWeight(param);
  }
};
