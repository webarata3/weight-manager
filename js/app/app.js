'use strict';

const InputHeightModel = require('../../js/model/input-height-model.js');
const InputHeightController = require('../../js/controller/input-height-controller.js');
const InputHeightView = require('../../js/view/input-height-view.js');

const InsertWeightModel = require('../../js/model/insert-weight-model.js');
const InsertWeightController = require('../../js/controller/insert-weight-controller.js');
const InsertWeightView = require('../view/insert-weight-view.js');

const UpdateWeightModel = require('../../js/model/update-weight-model.js');
const UpdateWeightController = require('../../js/controller/update-weight-controller.js');
const UpdateWeightView = require('../view/update-weight-view.js');

const WeightListModel = require('../../js/model/weight-list-model.js');
const WeightListController = require('../../js/controller/weight-list-controller.js');
const WeightListView = require('../../js/view/weight-list-view.js');

const AppModel = require('../../js/model/app-model.js');
const AppController = require('../../js/controller/app-controller.js');
const AppView = require('../../js/view/app-view.js');

class App {
  constructor() {
    const inputHeightModel = new InputHeightModel();
    const inputHeightController = new InputHeightController(inputHeightModel);
    const inputHeightView = new InputHeightView(inputHeightController, inputHeightModel);

    const insertWeightModel = new InsertWeightModel();
    const insertWeightController = new InsertWeightController(insertWeightModel);
    const insertWeightView = new InsertWeightView(insertWeightController, insertWeightModel);

    const updateWeightModel = new UpdateWeightModel();
    const updateWeightController = new UpdateWeightController(updateWeightModel);
    const updateWeightView = new UpdateWeightView(updateWeightController, updateWeightModel);

    const weightListModel = new WeightListModel();
    const weightListController = new WeightListController(weightListModel);
    const weightListView = new WeightListView(weightListController, weightListModel);

    const appModel = new AppModel();
    const appController = new AppController(appModel, weightListController, updateWeightController);
    const appView = new AppView(appController, appModel, inputHeightModel, insertWeightModel, updateWeightModel, weightListModel);
  }
}

module.exports = App;
