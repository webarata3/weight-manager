'use strict';

const {ipcRenderer} = require('electron');
const Vue = require('vue');

const inputHeightComponent = require('../js/component/input-height-component');
const inputWeightComponent = require('../js/component/input-weight-component');
const weightListComponent = require('../js/component/weight-list-component');

Vue.config.devtools = false;

const index = new Vue({
  el: '#mainWindow',
  data: {
    isMainContainer: true
  },
  components: {
    'input-height-component': inputHeightComponent,
    'input-weight-component': inputWeightComponent,
    'weight-list-component': weightListComponent
  },
  methods: {
    onClickMainButton: function() {
      this.isMainContainer = true;
    },
    onClickGraphButton: function() {
      this.isMainContainer = false;
    }
  },
  created: function() {
    this.$on('changeHeight', function() {
      this.$broadcast('refreshWeightList');
    });
    this.$on('insertWeight', function() {
      this.$broadcast('refreshWeightList');
    });
  }
});

index.$broadcast('init');