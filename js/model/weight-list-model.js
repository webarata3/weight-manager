'use strict';

const Model = require('../model/model.js');
const WeightDao = require('../dao/weight-dao.js');

class WeightModelList extends Model {
  constructor() {
    super();
  }

  get weightList() {
    return this._weightList;
  }

  init() {
    this.readAll();
  }

  readAll() {
    const weightDao = new WeightDao();
    weightDao.init().then(() => {
      weightDao.readAll().then(weightList => {
        this._weightList = weightList;
        this._trigger('change');
      }).catch((event) => {
        // TODO
        console.log(event);
        console.log('error');
      });
    }).catch(() => {
      // TODO
      console.log('error');
    });
  }
}

module.exports = WeightModelList;
