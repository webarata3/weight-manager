'use strict';

const Vue = require('vue');

const HeightDao = require('../dao/height-dao');

const inputHeightComponent = Vue.extend({
  template: '#insertHeightTemplate',
  data: function() {
    return {
      height: ''
    }
  },
  methods: {
    onInputHeight: function() {
      HeightDao.setHeight(this.height);
      this.$dispatch('changeHeight');
    }
  },
  created: function() {
    this.height = HeightDao.getHeight();
  }
});

module.exports = inputHeightComponent;
