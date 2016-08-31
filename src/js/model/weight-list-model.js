'use strict';

const Model = require('../model/model');
const WeightDao = require('../dao/weight-dao');

module.exports = class WeightModelList extends Model {
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
        throw new Error(event);
      });
    }).catch(() => {
      throw new Error(event);
    });
  }

  changeUpdateMode(param) {
    this._trigger('changeUpdateMode', param);
  }
};
