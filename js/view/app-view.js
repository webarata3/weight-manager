'use strict';

const AppController = require('../controller/app-controller.js');
const View = require('../view/view.js');

class AppView extends View {
  constructor(appController, inputHeightModel) {
    super();
    this._appController = appController;
    this._inputHeightModel = inputHeightModel;

    this._setAppEvent(this._inputHeightModel, {
      'change': this._change
    });
  }

  _change() {
    this._appController.readAll();
  }
}

module.exports = AppView;
