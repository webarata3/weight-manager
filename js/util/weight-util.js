'use strict';

class WeightUtil {
  static fixed1(value) {
    return Number.parseFloat(value).toFixed(1).toString();
  }

  static formatWeightList(height, weightList) {
    let diffWeight = null;
    let formatWeightList = [];
    weightList.forEach((weight) => {
      const formatWeight = {};
      formatWeight.date = weight.date;
      formatWeight.weight = WeightUtil.fixed1(weight.weight);
      formatWeight.diffWeight = diffWeight === null ? '0.0' : WeightUtil.fixed1(diffWeight);
      diffWeight = weight.weight;
      formatWeight.bmi = WeightUtil.fixed1(weight.weight / (height * height / 10000));

      formatWeightList.push(formatWeight);
    });
    return formatWeightList;
  }
}

module.exports = WeightUtil;