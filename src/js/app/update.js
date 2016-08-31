'use strict';

const UpdateModel = require('../js/model/update-model');
const UpdateController = require('../js/controller/update-controller');
const UpdateView = require('../js/view/update-view');

new UpdateController();

class Update {
  constructor() {
    const updateModel = new UpdateModel();
    const updateController = new UpdateController(updateModel);
    const updateView = new UpdateView(updateController, updateModel);
  }
}

new Update();
