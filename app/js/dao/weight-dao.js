'use strict';

{
  // WeigntDaoのシングルトンのインスタンス
  let instance = null;

  module.exports = class WeightDao {
    static getInstance() {
      if (instance) {
        return new Promise((resolve) => {
          resolve(instance);
        });
      }
      instance = new WeightDao();
      instance._indexedDB = window.indexedDB;
      instance._db = null;

      return WeightDao._init();
    }

    constructor() {
      // なにもしない
    }

    static _init() {
      return new Promise((resolve, reject) => {
        const request = instance._indexedDB.open('weightManager', 1);

        // DBのバージョンが上がった場合
        request.onupgradeneeded = event => {
          instance._db = event.target.result;
          if (instance._db.objectStoreNames.contains('weight')) {
            instance._db.deleteObjectStore('weight');
          }
          instance._db.createObjectStore('weight', {keyPath: 'date'});
        };

        // DBのオープンが成功した場合
        request.onsuccess = event => {
          instance._db = event.target.result;
          resolve(instance);
        };

        request.onerror = event => {
          reject(event);
        };
      });
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

    readAll() {
      const weightList = [];

      const tx = this._db.transaction(['weight'], 'readonly');

      const weightStore = tx.objectStore('weight');
      const cursorRequest = weightStore.openCursor();
      return new Promise((resolve, reject) => {
        cursorRequest.onsuccess = event => {
          let cursor = event.target.result;
          if (cursor) {
            const date = cursor.key;
            const weight = Number.parseFloat(cursor.value.weight);
            weightList.push({
              date: date,
              weight: weight
            });
            cursor.continue();
          } else {
            resolve(weightList);
          }
        };
        cursorRequest.onerror = error => {
          reject(error);
        };
      });
    }

    insert(weight) {
      return new Promise((resolve, reject) => {
        // キー情報の読み込み
        const tx = this._db.transaction(['weight'], 'readwrite');
        const store = tx.objectStore('weight');
        const request = store.get(weight.date);
        request.onsuccess = function(event) {
          const value = event.target.result;
          // すでに登録済みの場合エラー
          if (value !== undefined) {
            resolve(WeightDao.DUPLICATE);
          }
          store.add(weight);
          tx.oncomplete = () => {
            resolve(WeightDao.SUCESS);
          };
          tx.onerror = event => {
            reject(event);
          };
        };
        request.onerror = (error) => {
          reject(error);
        };
      });
    }

    update(weight) {
      return new Promise((resolve, reject) => {
        // キー情報の読み込み
        const tx = this._db.transaction(['weight'], 'readwrite');
        const store = tx.objectStore('weight');

        // 更新データがあるか先に検索する
        const request = store.get(weight.date);
        request.onsuccess = event => {
          const value = event.target.result;
          if (value === undefined) {
            resolve(WeightDao.NOT_EXIST);
            return;
          }
          store.put(weight);
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

    remove(weight) {
      return new Promise((resolve, reject) => {
        const tx = this._db.transaction(['weight'], 'readwrite');
        const store = tx.objectStore('weight');
        const request = store.delete(weight);
        request.onsuccess = () => {
          resolve();
        };
        request.onerror = function(event) {
          reject(event);
        };
      });
    }
  };
}