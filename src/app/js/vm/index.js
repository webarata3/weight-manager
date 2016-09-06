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
    },
    refrechWeightList: function() {
      this.$broadcast('refreshWeightList');
    }
  },
  events: {
    changeHeight: function() {
      this.refrechWeightList();
    },
    insertWeight: function() {
      this.refrechWeightList();
    }
  },
  created: function() {
    this.$broadcast('init');

    ipcRenderer.on('refresh_weight_list', () => {
      this.refrechWeightList();
    });
  }
});
