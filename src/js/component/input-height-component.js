'use strict';

const Vue = require('vue');

const inputHeightComponent = Vue.extend({
  template: '#insertHeightTemplate',
  data: () => {
    return {
      height: ''
    }
  },
  methods: {
    onInputHeight: function() {
      console.log(height);
    }
  }
});

module.exports = inputHeightComponent;
