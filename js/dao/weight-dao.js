'use strict';

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

class WeightDao {
  constructor() {
    this._indexedDB = window.indexedDB;
    this._db = null;
  }

  /**
   * コメントを付けないとWebStormで警告が出る
   * @returns {string}
   */
  static get DUPLICATE() {
    return 'duplicate';
  }

  /**
   * コメントを付けないとWebStormで警告が出る
   * @returns {string}
   */
  static get SUCCESS() {
    return 'success';
  }

  /**
   * コメントを付けないとWebStormで警告が出る
   * @returns {string}
   */
  static get NOT_EXIST() {
    return 'notExist';
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
        reject(event);
      };
    });
  }

  insert(date, weight) {
    return new Promise((resolve, reject) => {
      // キー情報の読み込み
      const tx = this._db.transaction(['weight'], 'readwrite');
      const store = tx.objectStore('weight');
      const request = store.get(date);
      request.onsuccess = function(event) {
        const value = event.target.result;
        // すでに登録済みの場合エラー
        if (value !== undefined) {
          resolve(WeightDao.DUPLICATE);
          return;
        }
        store.put({date: date, weight: weight});
        tx.oncomplete = () => {
          resolve(WeightDao.SUCESS);
        };
        tx.onerror = event => {
          reject(event);
        };
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  update(date, weight) {
    return new Promise((resolve, reject) => {
      // キー情報の読み込み
      const tx = this._db.transaction(['weight'], 'readwrite');
      const store = tx.objectStore('weight');
      const request = store.get(date);
      request.onsuccess = (event) => {
        const value = event.target.result;
        if (value === undefined) {
          resolve(WeightDao.NOT_EXIST);
          return;
        }
        store.put({date: date, weight: weight});
        tx.oncomplete = () => {
          resolve(WeightDao.SUCCESS);
        };
        tx.onerror = (event) => {
          reject(event);
        };
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  remove(date) {
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(['weight'], 'readwrite');
      const store = tx.objectStore('weight');
      const request = store.delete(date);
      request.onsuccess = function() {
        resolve();
      };
      request.onerror = function(event) {
        reject(event);
      };
    });
  }
}

module.exports = WeightDao;
