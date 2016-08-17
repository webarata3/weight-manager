'use strict';

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

const dbManager = {};

module.exports = dbManager;

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

  const promise = new Promise((resolve, reject) => {
    // DBのオープンが成功した場合
    request.onsuccess = event => {
      dbManager.db = event.target.result;
      resolve();
    };

    request.onerror = event => {
      reject(event);
    };
  });

  return promise;
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

dbManager.insert = (date, weight) => {
  const promise = new Promise((resolve, reject) => {
    // キー情報の読み込み
    const tx = dbManager.db.transaction(['weight'], 'readwrite');
    const store = tx.objectStore('weight');
    const request = store.get(date);
    request.onsuccess = function(event) {
      const value = event.target.result;
      // すでに登録済みの場合エラー
      if (value != null) {
        // TODO これだめ
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
  });

  return promise;
};

dbManager.update = (date, weight, completeCallback, errorCallback) => {
  new Promise((resolve, reject) => {
    // キー情報の読み込み
    const tx = dbManager.db.transaction(['weight'], 'readwrite');
    const store = tx.objectStore('weight');
    const request = store.get(date);
    request.onsuccess = function(event) {
      const value = event.target.result;
      // TODO
      // データが登録されていない場合エラーにするかどうか
      if (value == null) {
        // TODO これだめ
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

dbManager.delete = (date, completeCallback, errorCallback) => {
  new Promise((resolve, reject) => {
    // キー情報の読み込み
    const tx = dbManager.db.transaction(['weight'], 'readwrite');
    const store = tx.objectStore('weight');
    const request = store.delete(date);
    request.onsuccess = function(event) {
      resolve();
    };
  }).then(() => {
    console.log('success');
   // completeCallback();
  }).catch((error) => {
    // TODO エラー処理
    console.log(error);
   // errorCallback(error);
  });
};

