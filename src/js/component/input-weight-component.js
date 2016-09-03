'use strict';

const Vue = require('vue');

const inputWeightComponent = Vue.extend({
  template: '#insertWeightTemplate',
  data: () => {
    return {
      insertDate: '2016/09/01',
      insertWeight: 22
    }
  },
  methods: {
    onInputHeight: function() {
      console.log(height);
    }
  }
});

module.exports = inputWeightComponent;
