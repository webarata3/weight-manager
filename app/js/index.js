'use strict';

const electron = require('electron');

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

const indexedDB = window.indexedDB;

const $height = document.getElementById('height');

// 初期設定
{
  // ウィンドウの高さの決定
//  document.getElementsByClassName('content')[0].style.height = `${window.innerHeight}px`;

  const idb = indexedDB.open('weightManager', 1);

  idb.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('weight', {keyPath: 'date'});
  };
  setWeight();
}

let db;

function setWeight() {
  const $weightTable = document.getElementById('weightTable');
  $weightTable.innerHTML = '';

  const height = localStorage.getItem('height');
  if (height == null) return;

  $height.value = height;

  const idb = indexedDB.open('weightManager', 1);
  idb.onerror = function(event) {
    console.log('error');
  };

  idb.onsuccess = function(event) {
    db = idb.result;
    const tx = db.transaction(['weight'], 'readonly');

    const weightStore = tx.objectStore('weight');

    $weightTable.innerHTML = '';

    let beforeWeight = 0;
    let diffWeight = 0;

    weightStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        const date = cursor.key;
        const weight = Number.parseFloat(cursor.value.weight);
        const bmi = Number.parseFloat(weight / (height * height / 10000));

        const dispDate = moment(date).format('YYYY/MM/DD');

        diffWeight = Number.parseFloat(beforeWeight === 0 ? 0 : weight - beforeWeight);
        beforeWeight = weight;
        const $trEl = document.createElement('tr');
        $trEl.innerHTML = `
          <td>${dispDate}</td>
          <td class="number">${weight.toFixed(1)} kg</td>
          <td class="number">${diffWeight.toFixed(1)} kg</td>
          <td class="number">${bmi.toFixed(1)}</td>
          <td><button class="btn btn-positive">変更・削除</button></td>`;
        $weightTable.appendChild($trEl);
        cursor.continue();
      } else {
        // 読み込みの終了
        // ウィンドウの高さの決定
        // TODO 仮
        document.getElementsByClassName('content')[0].style.height = `${window.innerHeight - 50}px`;
      }
    };
  }
}

// イベント
$height.addEventListener('input', () => {
  if (checkHeight($height)) {
    localStorage.setItem('height', $height.value);
    setWeight();
  }
});

const $weight = document.getElementById('weight');
const $date = document.getElementById('date');

document.getElementById('registerWeightButton').addEventListener('click', () => {
  const isValid = checkDate($date) & checkWeight($weight);
  if (isValid) {
    addWeight(moment($date.value).format('YYYYMMDD'), $weight.value);
  }
});

function addWeight(date, weight) {
  // キー情報の読み込み
  let tx = db.transaction(['weight'], 'readwrite');
  let store = tx.objectStore('weight');
  let req = store.get(date);
  req.onsuccess = function(event) {
    var value = event.target.result;

    // すでに登録済みの場合エラー
    if (value != null) {
      document.getElementById('weightError').innerText = '指定の日の体重は登録済みです'
    }
    let req2 = store.put({date: date, weight: weight});
    tx.oncomplete = function() {
      console.log(date, weight);
      setWeight();
    };
    tx.onerror = function(event) {
      console.log("error", event);
    };
  };
}
