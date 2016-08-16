'use strict';

const electron = require('electron');
const ipcRenderer = require('electron').ipcRenderer;

// http://qiita.com/taizo/items/3a5505308ca2e303c099
const moment = require('moment');

const appValidator = require('../js/app-validator.js');
const dbManager = require('../js/db-manager.js');

const controller = {};

controller.init = () => {
  console.log('EEE');
  document.getElementById('cancelButton').addEventListener('click', () => {
    ipcRenderer.send('close_change_weight_window');
  });
};

// 実行
controller.init();

