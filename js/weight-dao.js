'use strict';

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

class Dao {
  constructor() {
    this._indexedDB = window.indexedDB;
    this._db = null;
  }

  init() {
    const request = this._indexedDB.open('weightManager', 1);

    // DBのバージョンが上がった場合
    request.onupgradeneeded = event => {
      this._db = event.target.result;
      this._db.createObjectStore('weight', {keyPath: 'date'});
    };

    return new Promise((resolve, reject) => {
      // DBのオープンが成功した場合
      request.onsuccess = event => {
        this._db = event.target.result;
        resolve();
      };

      request.onerror = event => {
        reject(event);
      };
    });
  }

  readAll() {
    const weightList = [];

    const tx = this._db.transaction(['weight'], 'readonly');

    const weightStore = tx.objectStore('weight');
    const cursorRequest = weightStore.openCursor();
    return new Promise((resolve, reject) => {
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
          resolve(weightList);
        }
      };
      cursorRequest.onerror = event => {
        // TODO
        console.log('ERROR');
      }
    });
  };
}

module.exports = Dao;

/*
 module.exports = dbManager;

 dbManager.indexedDB = window.indexedDB;
 dbManager.db = null;

 dbManager.SUCESS = 0;
 dbManager.DUPLICATE = 1;
 dbManager.NOT_EXIST = 2;

 // 初期化、アップグレード時の処理
 dbManager.init = () => {
 const request = dbManager.indexedDB.open('weightManager', 1);

 // DBのバージョンが上がった場合
 request.onupgradeneeded = event => {
 dbManager.db = event.target.result;
 dbManager.db.createObjectStore('weight', {keyPath: 'date'});
 };

 return new Promise((resolve, reject) => {
 // DBのオープンが成功した場合
 request.onsuccess = event => {
 dbManager.db = event.target.result;
 resolve();
 };

 request.onerror = event => {
 reject(event);
 };
 });
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
 return new Promise((resolve, reject) => {
 // キー情報の読み込み
 const tx = dbManager.db.transaction(['weight'], 'readwrite');
 const store = tx.objectStore('weight');
 const request = store.get(date);
 request.onsuccess = function(event) {
 const value = event.target.result;
 // すでに登録済みの場合エラー
 if (value != null) {
 resolve(dbManager.DUPLICATE)
 }
 store.put({date: date, weight: weight});
 tx.oncomplete = function() {
 resolve(dbManager.SUCESS);
 };
 tx.onerror = function(event) {
 reject();
 };
 };
 });
 };

 dbManager.update = (date, weight) => {
 return new Promise((resolve, reject) => {
 // キー情報の読み込み
 const tx = dbManager.db.transaction(['weight'], 'readwrite');
 const store = tx.objectStore('weight');
 const request = store.get(date);
 request.onsuccess = function(event) {
 const value = event.target.result;
 // データが登録されていない場合エラーとする（本来ありえないはず）
 if (value == null) {
 resolve(dbManager.NOT_EXIST);
 return;
 }
 store.put({date: date, weight: weight});
 tx.oncomplete = function() {
 resolve(dbManager.SUCESS);
 };
 tx.onerror = function(event) {
 reject();
 };
 };
 });
 };

 dbManager.delete = (date) => {
 return new Promise((resolve, reject) => {
 // キー情報の読み込み
 const tx = dbManager.db.transaction(['weight'], 'readwrite');
 const store = tx.objectStore('weight');
 const request = store.delete(date);
 request.onsuccess = function(event) {
 resolve();
 };
 });
 };
 */
