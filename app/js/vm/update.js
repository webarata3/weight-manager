'use strict';

const {ipcRenderer} = require('electron');
const Vue = require('vue');

const ValidatorUtil = require('../js/util/validator-util');
const WeightDao = require('../js/dao/weight-dao');
const WeightModel = require('../js/model/weight-model');

Vue.config.devtools = false;

const update = new Vue({
  el: '#mainWindow',
  data: {
    updateDate: '',
    updateWeight: '',
    updateError: false
  },
  methods: {
    onClickCancelButton: function() {
      ipcRenderer.send('close_update_window');
    },
    onClickUpdateButton: function() {
      this.updateError = false;
      // エラーがあれば何もしない
      if (this.isError) return;

      return WeightDao.getInstance().then(weightDao => {
        const formatDate = this.updateDate.split('/').join('');
        return weightDao.update(formatDate, this.updateWeight);
      }).then(status => {
        if (status === WeightDao.NOT_EXIST) {
          // エラー
          this.updateError = true;
        } else {
          ipcRenderer.send('close_update_window');
        }
      }).catch(error => {
        throw new Error(error);
      });
    },
    onClickDeleteButton: function() {
      if (!confirm('削除しますか')) return;

      WeightModel.remove(this.updateDate).then(() => {
        ipcRenderer.send('close_update_window');
      }).catch(error => {
        throw new Error(error);
      });
    }
  },
  computed: {
    isError: function() {
      return this.validation.updateWeight;
    },
    validation: function() {
      return {
        updateWeight: ValidatorUtil.validationWeight(this.updateWeight)
      };
    }
  },
  created: function() {
    ipcRenderer.on('shown_update_window', (event, param) => {
      this.updateDate = param.date;
      this.updateWeight = param.weight;
    });
  }
});
