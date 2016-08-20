'use strict';

const View = require('../view/view.js');

class AppView extends View {
  constructor(appController, inputHeightModel, insertWeightModel) {
    super();
    this._appController = appController;
    this._inputHeightModel = inputHeightModel;
    this._insertWeightModel = insertWeightModel;

    this._setAppEvent(this._inputHeightModel, {
      'change': this._change
    });
    this._setAppEvent(this._insertWeightModel, {
      'insert': this._change
    });
  }

  _change() {
    this._appController.readAll();
  }
}

module.exports = AppView;
