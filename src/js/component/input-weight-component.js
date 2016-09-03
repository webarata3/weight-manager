'use strict';

const Vue = require('vue');

const inputWeightComponent = Vue.extend({
  template: '#insertWeightTemplate',
  data: function() {
    return {
      insertDate: '',
      insertWeight: ''
    }
  },
  methods: {
    onClickInsertButton: function() {

    }
  }
});

module.exports = inputWeightComponent;
