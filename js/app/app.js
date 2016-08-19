'use strict';

const InputHeightModel = require('../../js/model/input-height-model.js');
const InputHeightController = require('../../js/controller/input-height-controller.js');
const InputHeightView = require('../../js/view/input-height-view.js');

class InputHeightApp {
  constructor() {
    const inputHeightModel = new InputHeightModel();
    const inputHeightController = new InputHeightController(inputHeightModel);
    const inputHeightView = new InputHeightView(inputHeightController, inputHeightModel);
  }
}

module.exports = InputHeightApp;
