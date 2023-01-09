const electron = require('electron')
const {app, BrowserWindow, ipcMain, ipcRenderer} = require("electron");
const fs = require('fs');
const path = require('path');

function createWindow () {

    const win = new BrowserWindow({
      icon: './costume2.png',
      autoHideMenuBar: true,
      fullscreen: true,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        devTools: true,
        contextIsolation: false,
        nodeIntegrationInSubFrames:true,
        nodeIntegrationInWorker: true,
        webviewTag:true
      }
    })
    require('@electron/remote/main').initialize()
    require('@electron/remote/main').enable(win.webContents)
  
    win.loadFile('index.html')
  }

  app.whenReady().then(createWindow)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  