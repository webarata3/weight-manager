'use strict';

const {ipcRenderer} = require('electron');
const Vue = require('vue');

Vue.config.devtools = false;

const index = new Vue({
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
    },
    onClickDeleteButton: function() {
    }
  },
  created: function() {
    ipcRenderer.on('shown_update_window', (event, param) => {
      this.date = param.date;
      this.weight = param.weight;
    });
  }
});
