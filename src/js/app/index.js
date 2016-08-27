'use strict';

const {ipcRenderer} = require('electron');

const WeightDao = require('../js/dao/weight-dao');

const InputHeightModel = require('../js/model/input-height-model');
const InputHeightController = require('../js/controller/input-height-controller');
const InputHeightView = require('../js/view/input-height-view');

const InsertWeightModel = require('../js/model/insert-weight-model');
const InsertWeightController = require('../js/controller/insert-weight-controller');
const InsertWeightView = require('../js/view/insert-weight-view');

const UpdateWeightModel = require('../js/model/update-weight-model');
const UpdateWeightController = require('../js/controller/update-weight-controller');
const UpdateWeightView = require('../js/view/update-weight-view');

const WeightListModel = require('../js/model/weight-list-model');
const WeightListController = require('../js/controller/weight-list-controller');
const WeightListView = require('../js/view/weight-list-view');

const IndexModel = require('../js/model/index-model');
const IndexController = require('../js/controller/index-controller');
const IndexView = require('../js/view/index-view');

class Index {
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

    const indexModel = new IndexModel();
    const indexController = new IndexController(indexModel, weightListController, updateWeightController);
    const indexView = new IndexView(indexController, indexModel, inputHeightModel, insertWeightModel, updateWeightModel, weightListModel);

    ipcRenderer.on('get_csv_data', () => {
      const promise = getFormatWeightList();

      promise.then(weightList => {
        ipcRenderer.send('send_csv', weightList);
      }).catch(error => {
        throw new Error(error);
      });
    });

    ipcRenderer.on('get_excel_data', () => {
      const promise = getFormatWeightList();
      promise.then((weightList) => {
        ipcRenderer.send('send_excel', weightList);
      }).catch(error => {
        throw new Error(event);
      });
    });
  }
}

new Index();

const WeightUtil = require('../js/util/weight-util.js');

function getFormatWeightList(height) {
  const weightDao = new WeightDao();

  const promise = Promise.resolve();
  return promise
    .then(() => {
      return weightDao.init();
    })
    .then(() => {
      return weightDao.readAll();
    })
    .then((weightList) => {
      return WeightUtil.formatWeightList(height, weightList);
    })
    .catch((error) => {
      throw new Error(error);
    });
}
