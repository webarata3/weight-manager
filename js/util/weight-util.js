'use strict';

module.exports = class WeightUtil {
  static fixed1(value) {
    return Number.parseFloat(value).toFixed(1).toString();
  }

  static formatWeightList(height, weightList) {
    let diffWeight = null;
    return weightList.map(weight => {
      console.log(weight);
      const formatWeight = {};
      formatWeight.date = weight.date;
      formatWeight.weight = WeightUtil.fixed1(weight.weight);
      formatWeight.diffWeight = diffWeight === null ? '0.0' : WeightUtil.fixed1(diffWeight);
      diffWeight = weight.weight;
      formatWeight.bmi = WeightUtil.fixed1(weight.weight / (height * height / 10000));
      return formatWeight;
    });
  }
};
