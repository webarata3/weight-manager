'use strict';

const ipcRenderer = require('electron');

const WeightListModel = require('../model/update-model');

module.exports = class UpdateController {
  constructor(updateModel) {
    this._updateModel = updateModel;
  }

  init() {
  }
};

// ipcRenderer.on('get_excel_data', () => {
//   const promise = getFormatWeightList();
//   promise.then((weightList) => {
//     ipcRenderer.send('send_excel', weightList);
//   }).catch(error => {
//     throw new Error(event);
//   });
// });
