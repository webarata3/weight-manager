'use strict';

class UpdateWeightController {
  constructor(updateWeightModel) {
    this._updateWeightModel = updateWeightModel;
  }

  init() {
    this._updateWeightModel.init();
  }

  updateWeight(param) {
    this._updateWeightModel.updateWeight(param);
  }
}

module.exports = UpdateWeightController;
