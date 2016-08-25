'use strict';

const ipcRenderer = require('electron').ipcRenderer;

const moment = require('moment');

const WeightDao = require('../dao/weight-dao');

const InputHeightModel = require('../../js/model/input-height-model');
const InputHeightController = require('../../js/controller/input-height-controller');
const InputHeightView = require('../../js/view/input-height-view');

const InsertWeightModel = require('../../js/model/insert-weight-model');
const InsertWeightController = require('../../js/controller/insert-weight-controller');
const InsertWeightView = require('../view/insert-weight-view');

const UpdateWeightModel = require('../../js/model/update-weight-model');
const UpdateWeightController = require('../../js/controller/update-weight-controller');
const UpdateWeightView = require('../view/update-weight-view');

const WeightListModel = require('../../js/model/weight-list-model');
const WeightListController = require('../../js/controller/weight-list-controller');
const WeightListView = require('../../js/view/weight-list-view');

const AppModel = require('../../js/model/app-model');
const AppController = require('../../js/controller/app-controller');
const AppView = require('../../js/view/app-view');

module.exports = class App {
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


    ipcRenderer.on('get_csv_data', () => {
      const promise = getFormatWeightList();

      promise.then(weightList => {
        let result = '計測日,体重,増減,BMI\n';
        weightList.forEach(data => {
          result = result + data.date + "," + data.weight + "\n";
        });
        ipcRenderer.send('send_csv', result);
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
};

const WeightUtil = require('../util/weight-util.js');

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
