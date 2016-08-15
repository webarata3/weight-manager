'use strict';

const electron = require('electron');

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

const appValidator = require('../js/appValidator');

const controller = {};
const dbManager = {};

//******************************
// 描画用のオブジェクト
//******************************
controller.init = () => {
  // 初期設定
  dbManager.init();

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
    });

    document.getElementsByClassName('content')[0].style.height = `${window.innerHeight - 50}px`;
  }).catch(() => {
    // TODO
  });
};

//******************************
// DB管理用のオブジェクト
//******************************
dbManager.indexedDB = window.indexedDB;
dbManager.db = null;

// 初期化、アップグレード時の処理
dbManager.init = () => {
  const request = indexedDB.open('weightManager', 1);

  // DBのバージョンが上がった場合
  request.onupgradeneeded = event => {
    dbManager.db = event.target.result;
    dbManager.db.createObjectStore('weight', {keyPath: 'date'});
  };

  // DBのオープンが成功した場合
  request.onsuccess = event => {
    dbManager.db = event.target.result;
    // 非同期だからうーん。
    // TODO
    controller.renderWeightList();
  };
};

// 全件読み込み
dbManager.readAll = () => {
  const weightList = [];

  const tx = dbManager.db.transaction(['weight'], 'readonly');

  const weightStore = tx.objectStore('weight');
  const cursorRequest = weightStore.openCursor();
  const promise = new Promise((resolve, reject) => {
    cursorRequest.onsuccess = event => {
      var cursor = event.target.result;
      if (cursor) {
        const date = cursor.key;
        const weight = Number.parseFloat(cursor.value.weight);
        const dispDate = moment(date).format('YYYY/MM/DD');
        weightList.push({
          date: dispDate,
          weight: weight
        });

        cursor.continue();
      } else {
        // 読み込みの終了
        // ウィンドウの高さの決定
        // TODO 仮
        document.getElementsByClassName('content')[0].style.height = `${window.innerHeight - 50}px`;
        resolve(weightList);
      }
    };
    cursorRequest.onerror = event => {
      // TODO
      console.log('ERROR');
    }
  });

  return promise;
};

dbManager.insert = (date, weight, completeCallback, errorCallback) => {
  new Promise((resolve, reject) => {
    // キー情報の読み込み
    const tx = dbManager.db.transaction(['weight'], 'readwrite');
    const store = tx.objectStore('weight');
    const request = store.get(date);
    request.onsuccess = function(event) {
      const value = event.target.result;
      // すでに登録済みの場合エラー
      if (value != null) {
        document.getElementById('weightError').innerText = '指定の日の体重は登録済みです'
      }
      store.put({date: date, weight: weight});
      tx.oncomplete = function() {
        resolve();
      };
      tx.onerror = function(event) {
        reject();
      };
    };
  }).then(() => {
    completeCallback();
  }).catch((error) => {
    // TODO エラー処理
    console.log(error);
    errorCallback(error);
  });
};

// 実行
controller.init();
