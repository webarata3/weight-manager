'use strict';

const {ipcRenderer} = require('electron');
const Vue = require('vue');

const vm = new Vue({
  el: '#insertForm',
  data: {
    height: '3'
  }
});

// 初期値のロード
vm.height = '123';
