'use strict';

const Vue = require('vue');

const HeightDao = require('../dao/height-dao');
const ValidatorUtil = require('../util/validator-util');

const inputHeightComponent = Vue.extend({
  template: '#inputHeightTemplate',
  data: function() {
    return {
      height: ''
    };
  },
  methods: {
    onInputHeight: function() {
      const isError = this.heightValidator;
      if (isError) {
        return;
      }

      HeightDao.setHeight(this.height);
      this.$dispatch('changeHeight');
    },
    onSubmit: function() {}
  },
  computed: {
    validation: function() {
      return {
        height: ValidatorUtil.validationHeight(this.height)
      };
    }
  },
  created: function() {
    this.height = HeightDao.getHeight();
  }
});

module.exports = inputHeightComponent;
