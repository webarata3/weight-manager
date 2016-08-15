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
    const weightStore = db.createObjectStore('weight', {keyPath: 'date'});
    /*
     weightStore.add({date: "20160803", weight: '75.0'});
     weightStore.add({date: "20160804", weight: '74.8'});
     weightStore.add({date: "20160807", weight: '73.9'});
     weightStore.add({date: "20160808", weight: '73.8'});
     weightStore.add({date: "20160801", weight: '75.0'});
     weightStore.add({date: "20160802", weight: '74.2'});
     weightStore.add({date: "20160809", weight: '73.8'});
     weightStore.add({date: "20160810", weight: '74.2'});
     weightStore.add({date: "20160811", weight: '74.1'});
     weightStore.add({date: "20160812", weight: '73.5'});
     weightStore.add({date: "20160817", weight: '73.4'});
     weightStore.add({date: "20160818", weight: '73.2'});
     weightStore.add({date: "20160819", weight: '72.1'});
     weightStore.add({date: "20160820", weight: '72.0'});
     weightStore.add({date: "20160821", weight: '72.4'});
     weightStore.add({date: "20160822", weight: '71.9'});
     weightStore.add({date: "20160823", weight: '71.8'});
     weightStore.add({date: "20160824", weight: '71.8'});
     weightStore.add({date: "20160825", weight: '71.8'});
     weightStore.add({date: "20160826", weight: '72.0'});
     weightStore.add({date: "20160827", weight: '71.7'});
     weightStore.add({date: "20160813", weight: '73.3'});
     weightStore.add({date: "20160814", weight: '73.1'});
     weightStore.add({date: "20160815", weight: '72.9'});
     weightStore.add({date: "20160816", weight: '72.8'});
     */
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
  let tx = db.transaction(['weight'], 'readwrite');
  let store = tx.objectStore('weight');
  console.log('date=' + date);
  let req = store.get(date);
  req.onsuccess = function(event) {
    var value = event.target.result;
    console.log('value= ' + value);
    if (value != null) {
      console.log('error');
      return;
    }
    let tx2 = db.transaction(['weight'], 'readwrite');
    let req2 = store.put({date: date, weight: weight});
    tx2.oncomplete = function() {
      console.log(date, weight);
      setWeight();
    };
    tx2.onerror = function(event) {
      console.log("error", event);
    };
  };
}
