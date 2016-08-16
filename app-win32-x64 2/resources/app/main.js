'use strict';

// / const {app, BrowserWindow} = require('electron');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let changeWeightWindow;

let menuTemplate = [
  {
    label: '体重管理',
    submenu: [
      {
        label: '体重管理について',
        accelerator: 'CmdOrCtrl+Shift+A',
        click: () => {
          showAboutDialog();
        }
      },
      {type: 'separator'},
      {
        label: '環境設定...', accelerator: 'CmdOrCtrl+,',
        click: () => {
          app.quit();
        }
      },
      {type: 'separator'},
      {
        label: '体重管理を終了', accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'ファイル',
    submenu: [
      {
        label: 'CSVファイルとして保存',
        accelerator: 'CmdOrCtrl+Shift+C',
        click: () => {
        }
      }
    ]
  }];

let menu = Menu.buildFromTemplate(menuTemplate);

function createWindow() {
  // メニューの設定
  Menu.setApplicationMenu(menu);

  // Create the browser window.
  win = new BrowserWindow({width: 700, height: 600});

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/html/index.html`);

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function showAboutDialog() {
  dialog.showMessageBox({
    type: 'info',
    buttons: ['OK'],
    message: '体重管理について',
    detail: '体重管理 バージョン 0.1.0'
  });
}

// changeWeightWindow関連
ipcMain.on('show_change_weight_window', (event, date, weight) => {
  showChangeWeightWindow();
});

ipcMain.on('close_change_weight_window', () => {
  changeWeightWindow.close();
});

function showChangeWeightWindow() {
  changeWeightWindow = new BrowserWindow({
    width: 200,
    height: 200,
    parent: win,
    resizable: false,
    minimizable: false,
    maximizable: false,
    modal: true
  });
  changeWeightWindow.loadURL('file://' + __dirname + '/html/changeWeight.html');
//  changeWeightWindow.webContents.openDevTools();
  changeWeightWindow.show();
  changeWeightWindow.on('closed', function() {
    changeWeightWindow = null;
  });
}

