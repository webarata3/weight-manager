'use strict';

class WeightListController {
  constructor(weightListModel) {
    this._weightListModel = weightListModel;
  }

  init() {
    this._weightListModel.init();
  }
}

module.exports = WeightListController;
