'use strict';

const Vue = require('vue');

const HeightDao = require('../dao/height-dao');
const ValidatorUtil = require('../util/validator-util');

const inputHeightComponent = Vue.extend({
  template: '#insertHeightTemplate',
  data: function() {
    return {
      height: ''
    }
  },
  methods: {
    onInputHeight: function() {
      const isError = this.heightValidator;
      if (isError) {
        console.log(isError);
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
        height: ValidatorUtil.validatorList(this.height, [
          ValidatorUtil.validRequired,
          ValidatorUtil.validDecimal,
          ValidatorUtil.validHeight
        ])
      }
    }
  },
  created: function() {
    this.height = HeightDao.getHeight();
  }
});

module.exports = inputHeightComponent;
