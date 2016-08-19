'use strict';

class InputHeightController {
  constructor(inputHeightModel) {
    this._inputHeightModel = inputHeightModel;
  }

  init() {
    this._inputHeightModel.init();
  }

  changeHeight(height) {
    this._inputHeightModel.changeHeight(height);
  }
}

module.exports = InputHeightController;
