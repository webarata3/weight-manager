'use strict';

const UpdateWeightModel = require('../js/component/update-weight-component');
const UpdateWeightController = require('../js/controller/update-weight-controller');
const UpdateWeightView = require('../js/view/update-weight-view');

class Update {
  constructor() {
    const updateWeightModel = new UpdateWeightModel();
    const updateWeightController = new UpdateWeightController(updateWeightModel);
    const updateWeightView = new UpdateWeightView(updateWeightController, updateWeightModel);
  }
}

new Update();
