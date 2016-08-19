'use strict';

const DomUtil = require('../util/dom-util.js');
const View = require('../view/view.js');

class WeightListView extends View{
  constructor(weightListController, weightListModel) {
    super();
    this._weightListController = weightListController;
    this._weightListModel = weightListModel;

    this._setEl({
      'weightTable': '_$weightTable'
    });

    this._setAppEvent(this._weightListModel, {
      'change': this._change
    });

    this._init();
  }

  _init() {
    this._weightListController.init();
  }

  _change() {
    this._render();
  }

  _render() {
    this._$weightTable.innerHTML = '';

    const height = localStorage.getItem('height');

    if (height == null) return;

    let beforeWeight = 0;
    let diffWeight = 0;

    this._weightListModel.weightList.forEach(currentValue => {
      const weight = Number.parseFloat(currentValue.weight);
      const bmi = Number.parseFloat(weight / (height * height / 10000));
      diffWeight = Number.parseFloat(beforeWeight === 0 ? 0 : weight - beforeWeight);
      beforeWeight = weight;
      const $trEl = document.createElement('tr');
      $trEl.innerHTML = `
          <td>${currentValue.date}</td>
          <td class="number">${weight.toFixed(1)} kg</td>
          <td class="number">${diffWeight.toFixed(1)} kg</td>
          <td class="number">${bmi.toFixed(1)}</td>
          <td><button class="btn btn-mini btn-positive">変更・削除</button></td>`;
      this._$weightTable.appendChild($trEl);

      $trEl.getElementsByTagName('button')[0].addEventListener('click', () => {
        this._controller.changeUpdateMode(currentValue.date, weight);
      });
    });
  }
}

module.exports = WeightListView;
