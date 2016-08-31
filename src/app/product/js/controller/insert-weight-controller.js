'use strict';

module.exports = class InsertWeightController {
  constructor(insertWeightModel) {
    this._insertWeightModel = insertWeightModel;
  }

  init() {
    this._insertWeightModel.init();
  }

  insertWeight(date, weight) {
    this._insertWeightModel.insertWeight(date, weight);
  }
};
