'use strict';

const {ipcRenderer} = require('electron');
const Vue = require('vue');

const inputHeightComponent = require('../js/component/input-height-component');
const insertWeightComponent = require('../js/component/insert-weight-component');
const weightListComponent = require('../js/component/weight-list-component');

Vue.config.devtools = false;

const index = new Vue({
  el: '#mainWindow',
  data: {
    isMainContainer: true
  },
  components: {
    'input-height-component': inputHeightComponent,
    'insert-weight-component': insertWeightComponent,
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
    this.$broadcast('init');

    this.$on('changeHeight', function() {
      this.$broadcast('refreshWeightList');
    });
    this.$on('insertWeight', function() {
      this.$broadcast('refreshWeightList');
    });
    ipcRenderer.on('refresh_weight_list', () => {
      this.$broadcast('refreshWeightList');
    });
  }
});
