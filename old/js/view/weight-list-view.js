'use strict';

const Chart = require('chart.js');
const moment = require('moment');

const View = require('../view/view');

module.exports = class WeightListView extends View {
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

  _rawHtml(templates, ...values) {
    let result = '';
    templates.forEach((template, index) => {
      result = result + template;
      if (index < values.length) {
        if (index === 0) {
          result = result + values[index];
        } else {
          result = result + Number.parseFloat(values[index]).toFixed(1);
        }
      }
    });

    return result;
  }

  _render() {
    this._$weightTable.innerHTML = '';

    const height = localStorage.getItem('height');

    if (height === null) return;

    let beforeWeight = 0;
    let diffWeight = 0;

    this._weightListModel.weightList.forEach(currentValue => {
      const date = currentValue.date;
      const weight = currentValue.weight;
      const bmi = (weight / (height * height / 10000));
      diffWeight = Number.parseFloat(beforeWeight === 0 ? 0 : weight - beforeWeight);
      beforeWeight = weight;
      const $trEl = document.createElement('tr');
      $trEl.innerHTML =
        this._rawHtml `<td>${date}</td><td>${weight}</td><td>${diffWeight}</td><td>${bmi}</td>
                       <td><button class="btn btn-mini btn-positive">変更・削除</button></td>`;
      this._$weightTable.appendChild($trEl);

      $trEl.getElementsByTagName('button')[0].addEventListener('click', () => {
        this._weightListController.showUpdateWindw({
          date: currentValue.date,
          weight: weight
        });
      });
    });

    const dateList = [];
    const weightList = [];
    this._weightListModel.weightList.forEach(currentValue => {
      const formatDate = moment(currentValue.date.split('/').join('-')).format('M/DD');
      dateList.push(formatDate);
      weightList.push(currentValue.weight);
    });
    const data = {
      labels: dateList,
      datasets: [{
        label: '体重',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: weightList
      }]
    };
    const ctx = document.getElementById('weightGraph').getContext('2d');
    const options = {};
    Chart.Line(ctx, {
      data: data,
      options: options
    });
  }
};
