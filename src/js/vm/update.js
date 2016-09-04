'use strict';

const {ipcRenderer} = require('electron');
const Vue = require('vue');

const WeightDao = require('../js/dao/weight-dao');
const WeightModel = require('../js/model/weight-model');

Vue.config.devtools = false;

const update = new Vue({
  el: '#mainWindow',
  data: {
    date: '',
    weight: ''
  },
  methods: {
    onClickCancelButton: function() {
      ipcRenderer.send('close_update_window');
    },
    onClickUpdateButton: function() {
      // TODO だめ
      const weightDao = new WeightDao();
      const promise = Promise.resolve();
      promise.then(() => {
        return weightDao.init();
      }).then(() => {
        const formatDate =　this.date.split('/').join('');
        console.log(formatDate);
        return weightDao.update(formatDate, this.weight);
      }).then(status => {
        if (status === WeightDao.NOT_EXIST) {
          console.log('not exist');
          // エラー
        } else {
          console.log('success');
          ipcRenderer.send('close_update_window');
        }
      }).catch(error => {
        throw new Error(error);
      });
    },
    onClickDeleteButton: function() {
      if (!confirm("削除しますか")) return;

      WeightModel.remove(this.date).then(() => {
        ipcRenderer.send('close_update_window');
      }).catch(error => {
        throw new Error(error);
      });
    }
  },
  created: function() {
    ipcRenderer.on('shown_update_window', (event, param) => {
      this.date = param.date;
      this.weight = param.weight;
    });
  }
});
