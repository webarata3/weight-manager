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
    },
    onSubmit: function() {}
  }
});

module.exports = inputWeightComponent;
