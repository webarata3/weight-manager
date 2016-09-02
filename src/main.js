'use strict';

// / const {app, BrowserWindow} = require('electron');
const {app, BrowserWindow, dialog, electron, Menu, ipcMain} = require('electron');

const fs = require('fs');
const officegen = require('officegen');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let updateWindow;

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
        label: '環境設定...',
        accelerator: 'CmdOrCtrl+,',
        click: () => {
          app.quit();
        }
      },
      {type: 'separator'},
      {
        label: '体重管理を終了',
        accelerator: 'CmdOrCtrl+Q',
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
  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(menu);
  } else {
    win.setMenu(menu);
  }

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

ipcMain.on('send_csv', (event, weightList) => {
  let result = '計測日,体重,増減,BMI\r\n';
  weightList.forEach(weight => {
    result = result + `${weight.date},${weight.weight},${weight.diffWeight},${weight.bmi}\n`;
  });

  fs.writeFile(fileName, result, error => {
    if (error) throw new Error(error);
  });
});

ipcMain.on('send_excel', (event, weightList) => {
  const xlsx = officegen('xlsx');
  xlsx.on('finalize', function(written) {
    // 成功
  });

  xlsx.on('error', function(error) {
    throw new Error(error);
  });

  let sheet = xlsx.makeNewSheet();
  sheet.name = '体重管理';

  sheet.data[0] = ['計測日', '体重', '増減', 'BMI'];
  weightList.forEach((weight, y) => {
    sheet.data[y + 1] = [];
    sheet.data[y + 1][0] = weight.date;
    sheet.data[y + 1][1] = weight.weight;
    sheet.data[y + 1][2] = weight.diffWeight;
    sheet.data[y + 1][3] = weight.bmi;
  });

  const out = fs.createWriteStream(fileName);

  out.on('error', function(error) {
    throw new Error(error);
  });

  xlsx.generate(out);
});

ipcMain.on('show_update_window', (event, param) => {
  showUpdateWindow(param);
});

function showUpdateWindow(param) {
  updateWindow = new BrowserWindow({
    width: 400,
    height: 300,
    minimizable: false,
    maximizable: false,
    resizable: false,
    parent: win,
    modal: true
  });

  updateWindow.on('closed', function() {
    updateWindow = null;
  });

  updateWindow.webContents.on('did-finish-load', () => {
    updateWindow.webContents.send('shown_update_window', param);
  });

  updateWindow.loadURL('file://' + __dirname + '/html/update.html');
  updateWindow.webContents.openDevTools();
  updateWindow.show();
}

ipcMain.on('close_update_window', (event) => {
  updateWindow.close();
});
