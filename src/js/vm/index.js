'use strict';

const {ipcRenderer} = require('electron');
const Vue = require('vue');
const inputHeightComponent = require('../js/component/input-height-component');

Vue.config.devtools = false;

const index = new Vue({
  el: '#mainContainer',
  data: {},
  components: {
    'input-height-component': inputHeightComponent
  }
});
