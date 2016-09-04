'use strict';

const {ipcRenderer} = require('electron');

const Vue = require('vue');
const Chart = require('chart.js');
const moment = require('moment');
const WeightModel = require('../model/weight-model');

const weightListComponent = Vue.extend({
  template: '#weightListTemplate',
  data: function() {
    return {
      weightList: []
    }
  },
  methods: {
    onClickUpdateButton: function(index) {
      ipcRenderer.send('show_update_window', {
        date: this.weightList[index].date,
        weight: this.weightList[index].weight
      });
    },
    render: function() {
      const weightModel = new WeightModel();
      WeightModel.readAll().then((weightList) => {
        this.weightList = weightList;

        this.renderGraph();
      }).catch((event) => {
        throw new Error(event);
      });
    },
    renderGraph: function() {
      const dateList = [];
      const weightList = [];
      this.weightList.forEach(currentValue => {
        dateList.push(currentValue.date);
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
  },
  created: function() {
    this.render();
    this.$on('refreshWeightList', function() {
      this.render();
    });
  }
});

module.exports = weightListComponent;
