'use strict';

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

const ValidatorUtil = require('../util/validator-util.js');
const Model = require('../model/model.js');
const WeightDao = require('../dao/weight-dao.js');

class UpdateWeightModel extends Model {
  constructor() {
    super();
  }

  init() {
  }

  updateWeight(param) {
    this._trigger('initUpdate', param);
  }

  cancel() {
    this._trigger('changeInsertMode');
  }

  update(date, weight) {
    const errorMessageMap = {};
    let errorMessage = ValidatorUtil.checkWeight(weight);
    if (errorMessage != null) {
      errorMessageMap['updateWeight'] = errorMessage;
    }
    if (Object.keys(errorMessageMap).length != 0) {
      this._trigger('invalid', errorMessageMap);
      return;
    }

    const weightDao = new WeightDao();
    weightDao.init().then(() => {
      const formatDate = moment(date.split('/').join('-')).format('YYYYMMDD');
      weightDao.update(formatDate, weight).then(updateStatus => {
        if (updateStatus === WeightDao.NOT_EXIST) {
          this._trigger('update', '指定の日の体重は削除されています')
        } else {
          this._trigger('update');
        }
      }).catch((event) => {
        // TODO
        console.log('error', event);
      });
    });
  }

  remove(date) {
    const weightDao = new WeightDao();
    weightDao.init().then(() => {
      weightDao.remove(date.split('/').join('')).then(() => {
        this._trigger('remove');
      }).catch(() => {
      });
    });
  }
}

module.exports = UpdateWeightModel;
