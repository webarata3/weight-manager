'use strict';

const electron = require('electron');

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

const chart = require('chart.js');

const appValidator = require('../js/app-validator.js');
const dbManager = require('../js/db-manager.js');

const controller = {};

module.exports = controller;

controller.init = () => {
  const $height = document.getElementById('height');

  controller.$insertError = document.getElementById('insertError');
  controller.$insertDate = document.getElementById('insertDate');
  controller.$insertWeight = document.getElementById('insertWeight');

  controller.$updateError = document.getElementById('updateError');
  controller.$updateDate = document.getElementById('updateDate');
  controller.$updateWeight = document.getElementById('updateWeight');

  controller.$insertFieldset = document.getElementById('insertFieldset');
  controller.$updateFieldset = document.getElementById('updateFieldset');


  // 初期設定
  dbManager.init().then(
    controller.renderWeightList
  ).catch(() => {
    // TODO
  });

  // イベント
  $height.addEventListener('input', () => {
    if (appValidator.checkHeight($height)) {
      localStorage.setItem('height', $height.value);
      controller.renderWeightList();
    }
  });

  document.getElementById('insertButton').addEventListener('click', () => {
    controller.clearinsertArea();

    const isValid = appValidator.checkDate(controller.$insertDate)
      & appValidator.checkWeight(controller.$insertWeight);
    if (isValid) {
      const date = moment(controller.$insertDate.value).format('YYYYMMDD');
      const weight = controller.$insertWeight.value;
      dbManager.insert(date, weight).then(insertStatus => {
        if (insertStatus === dbManager.DUPLICATE) {
          controller.$insertError.innerText = '指定の日の体重は登録済みです';
        } else {
          controller.renderWeightList();
        }
      }).catch(() => {
        // TODO
      });
    }
  });

  document.getElementById('cancelButton').addEventListener('click', () => {
    controller.clearUpdateArea();
    controller.setinsertMode();
  });

  document.getElementById('updateButton').addEventListener('click', () => {
    controller.clearUpdateArea();

    const isValid = appValidator.checkWeight(controller.$updateWeight);
    if (isValid) {
      const date = moment(controller.$updateDate.innerText.split('/').join('-')).format('YYYYMMDD');
      const weight = controller.$updateWeight.value;
      dbManager.update(date, weight).then(updateStatus => {
        if (updateStatus === dbManager.NOT_EXIST) {
          document.getElementById('updateError').innerText = '指定の日の体重は削除されています'
        } else {
          controller.renderWeightList();
        }
      }).catch(() => {
        // TODO
      });
    }
  });

  document.getElementById('deleteButton').addEventListener('click', () => {
    const date = moment(controller.$updateDate.innerText.split('/').join('-')).format('YYYYMMDD');
    dbManager.delete(date).then(
      // TODO
    ).catch(
      // TODO
    );
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

    weightList.forEach(currentValue => {
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
        controller.setChangeMode(currentValue.date, weight);
      });
    });

    document.getElementsByClassName('content')[0].style.height = `${window.innerHeight - 50}px`;
  }).catch(() => {
    // TODO
  });

// TODO
  //「月別データ」
  var mydata = {
    labels: ['8/10', '8/11', '8/12', '8/13', '8/14', '8/15'],
    datasets: [{
      label: '体重',
      hoverBackgroundColor: "rgba(255,99,132,0.3)",
      data: [84, 83.2, 83.1, 83.5, 83.2, 82.1],
    }]
  };

//「オプション設定」
  var options = {
    title: {
//      display: true,
      //     text: 'サンプルチャート'
    }
  };

  var canvas = document.getElementById('weightGraph');
  var chart = new Chart(canvas, {

    type: 'line',  //グラフの種類
    data: mydata,  //表示するデータ
    options: options,  //オプション設定
    lineTension: 0
  });
};

controller.setinsertMode = () => {
  controller.$insertFieldset.removeAttribute('disabled');
  controller.$updateFieldset.setAttribute('disabled', 'disabled');

  controller.$updateDate.innerText = '';
  controller.$updateWeight.value = '';
};

controller.setChangeMode = (date, weight) => {
  controller.$insertFieldset.setAttribute('disabled', 'disabled');
  controller.$updateFieldset.removeAttribute('disabled');

  controller.$updateDate.innerText = date;
  controller.$updateWeight.value = weight.toFixed(1);
};

controller.clearinsertArea = () => {
  controller.$insertError.innerText = '';
};

controller.clearUpdateArea = () => {
  controller.$updateError.innerText = '';
};
