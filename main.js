'use strict';

// / const {app, BrowserWindow} = require('electron');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const dialog = electron.dialog;
const ipcMain = require('electron').ipcMain;

const fs = require('fs');
const officegen = require('officegen');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let changeWeightWindow;

let fileName;

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
    submenu: [{
      label: 'CSVファイルとして保存',
      accelerator: 'CmdOrCtrl+Shift+C',
      click: () => {
        dialog.showSaveDialog({
          title: '保存するCSVファイル名',
          filters: [
            {name: 'CSVファイル', extensions: ['csv']}
          ]
        }, (file) => {
          fileName = file;
          win.webContents.send('get_csv_data');
        });
      }
    }, {
      label: 'Excelファイルとして保存',
      accelerator: 'CmdOrCtrl+Shift+E',
      click: () => {
        dialog.showSaveDialog({
          title: '保存するExcelファイル名',
          filters: [
            {name: 'Excelファイル', extensions: ['xlsx']}
          ]
        }, (file) => {
          fileName = file;
          win.webContents.send('get_excel_data');
        });
      }
    }]
  }];

let menu = Menu.buildFromTemplate(menuTemplate);

function createWindow() {
  // メニューの設定
  Menu.setApplicationMenu(menu);

  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 700});

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

ipcMain.on('send_csv', (event, message) => {
  fs.writeFile(fileName, message, function(error) {
  });
});

ipcMain.on('send_excel', (event, weightList) => {
  const xlsx = officegen('xlsx');
  xlsx.on('finalize', function(written) {
    console.log('Finish to create an Excel file.\nTotal bytes created: ' + written);
  });

  xlsx.on('error', function(err) {
    console.log(err);
  });

  let sheet = xlsx.makeNewSheet();
  sheet.name = '体重管理';

  sheet.data[0] = ['計測日', '体重', '増減', 'BMI'];
  weightList.forEach((value, y) => {
    sheet.data[y + 1] = [];
    sheet.data[y + 1][0] = value.date;
    sheet.data[y + 1][1] = value.weight;
    sheet.data[y + 1][2] = value.diffWeight;
    sheet.data[y + 1][3] = value.bmi;
  });

  const out = fs.createWriteStream(fileName);

  out.on('error', function(err) {
    console.log(err);
  });

  xlsx.generate(out);
});
