'use strict';

const Vue = require('vue');

const inputHeightComponent = Vue.extend({
  template: '#insertTemplate',
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
