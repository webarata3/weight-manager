'use strict';

const electron = require('electron');

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

const chart = require('chart.js');

const appValidator = require('../js/app-validator.js');
const dbManager = require('../js/db-manager.js');

const controller = {};

controller.init = () => {
  const $height = document.getElementById('height');

  controller.$registerDate = document.getElementById('registerDate');
  controller.$registerWeight = document.getElementById('registerWeight');

  controller.$registerFieldset = document.getElementById('registerFieldset');
  controller.$changeFieldset = document.getElementById('changeFieldset');


  // 初期設定
  const promise = dbManager.init();

  promise.then(
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

  document.getElementById('registerButton').addEventListener('click', () => {
    controller.clearRegisterArea();

    const isValid = appValidator.checkDate(controller.$registerDate)
      & appValidator.checkWeight(controller.$registerWeight);
    if (isValid) {
      const date = moment(controller.$registerDate.value).format('YYYYMMDD');
      const weight = controller.$registerWeight.value;
      dbManager.insert(date, weight).then(registerStatus => {
        if (registerStatus === dbManager.DUPLICATE) {
          document.getElementById('registerError').innerText = '指定の日の体重は登録済みです';
        } else {
          controller.renderWeightList();
        }
      }).catch(() => {
        // TODO
      });
    }
  });

  document.getElementById('cancelButton').addEventListener('click', () => {
    controller.setRegisterMode();
  });

  document.getElementById('changeButton').addEventListener('click', () => {
    controller.clearUpdateArea();

    const $selectedDate = document.getElementById('selectedDate');
    const $changeWeight = document.getElementById('changeWeight');

    // 一度エラーを消す
    document.getElementById('registerError').innerText = '';

    const isValid = appValidator.checkWeight($changeWeight);
    if (isValid) {
      const date = moment($selectedDate.innerText.split('/').join('-')).format('YYYYMMDD');
      const weight = $changeWeight.value;
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
    const $selectedDate = document.getElementById('selectedDate');
    const date = moment($selectedDate.innerText.split('/').join('-')).format('YYYYMMDD');
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
    datasets: [
      {
        label: '体重',
        hoverBackgroundColor: "rgba(255,99,132,0.3)",
        data: [84, 83.2, 83.1, 83.5, 83.2, 82.1],
      }
    ]
  };

//「オプション設定」
  var options = {
    title: {
      display: true,
      text: 'サンプルチャート'
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

controller.setRegisterMode = () => {
  controller.$registerFieldset.removeAttribute('disabled');
  controller.$changeFieldset.setAttribute('disabled', 'disabled');

  document.getElementById('selectedDate').innerText = '';
  document.getElementById('changeWeight').value = '';
};

controller.setChangeMode = (date, weight) => {
  controller.$registerFieldset.setAttribute('disabled', 'disabled');
  controller.$changeFieldset.removeAttribute('disabled');

  document.getElementById('selectedDate').innerText = date;
  document.getElementById('changeWeight').value = weight.toFixed(1);
};

controller.clearRegisterArea = () => {
  document.getElementById('registerError').innerText = '';
};

controller.clearUpdateArea = () => {
  document.getElementById('updateError').innerText = '';
};


// 実行
controller.init();
