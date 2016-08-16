'use strict';

const electron = require('electron');

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

const appValidator = require('../js/app-validator.js');
const dbManager = require('../js/db-manager.js');

const controller = {};

controller.init = () => {
  // 初期設定
  const promise = dbManager.init();

  promise.then(() => {
    controller.renderWeightList();
  }).catch(() => {
    // TODO
  });

  const $height = document.getElementById('height');
  // イベント
  $height.addEventListener('input', () => {
    if (appValidator.checkHeight($height)) {
      localStorage.setItem('height', $height.value);
      controller.renderWeightList();
    }
  });

  document.getElementById('registerWeightButton').addEventListener('click', () => {
    const $weight = document.getElementById('weight');
    const $date = document.getElementById('date');

    const isValid = appValidator.checkDate($date) & appValidator.checkWeight($weight);
    if (isValid) {
      const date = moment($date.value).format('YYYYMMDD');
      const weight = $weight.value;
      dbManager.insert(date, weight, controller.renderWeightList);
    }
  });
};

controller.renderWeightList = () => {
  const promise = dbManager.readAll();

  const $weightTable = document.getElementById('weightTable');
  promise.then(weightList => {
    $weightTable.innerHTML = '';

    const height = localStorage.getItem('height');
    if (height == null) return;

    document.getElementById('height').value = height;

    let beforeWeight = 0;
    let diffWeight = 0;

    weightList.forEach((currentValue) => {
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
      $weightTable.appendChild($trEl);

      $trEl.getElementsByTagName('button')[0].addEventListener('click', () => {
        document.getElementById('dialogBack').classList.remove('hide');
        document.getElementById('changeWeightWindow').classList.remove('hide');
      });
    });

    document.getElementsByClassName('content')[0].style.height = `${window.innerHeight - 50}px`;
  }).catch(() => {
    // TODO
  });
};

// 実行
controller.init();
