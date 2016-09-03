'use strict';

const Vue = require('vue');

const weightListComponent = Vue.extend({
  template: '#weightListTemplate',
  data: () => {
    return {
      weightList: [
      ]
    }
  },
  methods: {
    render: function() {
      this.weightList.push({
        date: '2016/11/10',
        weight: 33.4,
        diffWeight: 33.3,
        bmi: 22.2
      });
    }
  },
  attached: function() {
    this.render();
  }
});

module.exports = weightListComponent;
