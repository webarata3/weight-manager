'use strict';

const Vue = require('vue');
const WeightModel = require('../model/weight-model');

const weightListComponent = Vue.extend({
  template: '#weightListTemplate',
  data: function() {
    return {
      weightList: []
    }
  },
  methods: {
    render: function() {
      const weightModel = new WeightModel();
      WeightModel.readAll().then((weightList) => {
        this.weightList = weightList;
      }).catch((event) => {
        throw new Error(event);
      });
    }
  },
  created: function() {
    this.render();
    this.$on('refreshWeightList', function() {
      this.render();
    });
  },
  attached: function() {
//    this.render();
  }
});

module.exports = weightListComponent;
