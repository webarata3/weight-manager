'use strict';

const Vue = require('vue');

const ValidatorUtil = require('../util/validator-util');
const WeightModel = require('../model/weight-model');
const WeightDao = require('../dao/weight-dao');

const insertWeightComponent = Vue.extend({
  template: '#insertWeightTemplate',
  data: function() {
    return {
      insertDate: '',
      insertWeight: '',
      insertError: false
    };
  },
  methods: {
    onClickInsertButton: function() {
      this.insertError = false;

      // エラーがあれば何もしない
      if (this.isError) return;

      WeightModel.insert(this.insertDate, this.insertWeight).then((status) => {
        if (status === WeightDao.DUPLICATE) {
          this.insertError = true;
          return;
        }
        this.insertDate = '';
        this.insertWeight = '';
        this.$dispatch('insertWeight');
      }).catch((error) => {
        throw new Error(error);
      });
    },
    onSubmit: function() {
    }
  },
  computed: {
    isError: function() {
      return this.validation.insertDate || this.validation.insertWeight;
    },
    validation: function() {
      return {
        insertDate: ValidatorUtil.validationDate(this.insertDate),
        insertWeight: ValidatorUtil.validationWeight(this.insertWeight)
      };
    }
  }
});

module.exports = insertWeightComponent;
