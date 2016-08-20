'use strict';

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

const ValidatorUtil = require('../util/validator-util.js');
const Model = require('../model/model.js');
const WeightDao = require('../dao/weight-dao.js');

class InsertWeightModel extends Model {
  constructor() {
    super();
  }

  init() {
  }

  insertWeight(date, weight) {
    const errorMessageMap = {};
    let errorMessage = ValidatorUtil.checkDate(date);
    if (errorMessage != null) {
      errorMessageMap['insertDate'] = errorMessage;
    }
    errorMessage = ValidatorUtil.checkWeight(weight);
    if (errorMessage != null) {
      errorMessageMap['insertWeight'] = errorMessage;
    }
    if (Object.keys(errorMessageMap).length != 0) {
      this._trigger('invalid', errorMessageMap);
      return;
    }

    const formatYYYYMMDD = moment(date).format('YYYYMMDD');
    const weightDao = new WeightDao();
    weightDao.init().then(() => {
      weightDao.insert(formatYYYYMMDD, weight).then((status) => {
        if (status === WeightDao.DUPLICATE) {
          this._trigger('insert', '指定の計測日の体重は登録済みです')
        } else {
          this._trigger('insert');
        }
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

module.exports = InsertWeightModel;
