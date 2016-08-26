'use strict';

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

  changeUpdateMode(param) {
    this._weightListModel.changeUpdateMode(param);
  }
};
