'use strict';

const WeightListModel = require('../model/weight-list-model');

module.exports = class IndexController {
  constructor(indexModel, weightListController) {
    this._indexModel = indexModel;
    this._weightListController = weightListController;
  }

  readAll() {
    this._weightListController.readAll();
  }
};
