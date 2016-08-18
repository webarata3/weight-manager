'use strict';

const WeightView = require('../js/weight-view.js');
const WeightController = require('../js/weight-controller.js');
const WeightModel = require('../js/weight-model.js');

class WeightApp {
  constructor() {
    const model = new WeightModel();
    const controller = new WeightController(model);
    const view = new WeightView(controller, model);
  }
}

new WeightApp();
