'use strict';

const InputHeightModel = require('../../js/model/input-height-model.js');
const InputHeightController = require('../../js/controller/input-height-controller.js');
const InputHeightView = require('../../js/view/input-height-view.js');

const WeightListModel = require('../../js/model/weight-list-model.js');
const WeightListController = require('../../js/controller/weight-list-controller.js');
const WeightListView = require('../../js/view/weight-list-view.js');

const AppController = require('../../js/controller/app-controller.js');
const AppView = require('../../js/view/app-view.js');

class InputHeightApp {
  constructor() {
    const inputHeightModel = new InputHeightModel();
    const inputHeightController = new InputHeightController(inputHeightModel);
    const inputHeightView = new InputHeightView(inputHeightController, inputHeightModel);

    const weightListModel = new WeightListModel();
    const weightListController = new WeightListController(weightListModel);
    const weightListView = new WeightListView(weightListController, weightListModel);

    const appController = new AppController(weightListModel);
    const appView = new AppView(appController, weightListModel);
  }
}

module.exports = InputHeightApp;
