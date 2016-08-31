'use strict';

module.exports = class UpdateWeightController {
  constructor(updateWeightModel) {
    this._updateWeightModel = updateWeightModel;
  }

  init() {
    this._updateWeightModel.init();
  }

  updateWeight(param) {
    this._updateWeightModel.updateWeight(param);
  }

  cancel() {
    this._updateWeightModel.cancel();
  }

  update(date, weight) {
    this._updateWeightModel.update(date, weight);
  }

  remove(date) {
    this._updateWeightModel.remove(date);
  }
};
