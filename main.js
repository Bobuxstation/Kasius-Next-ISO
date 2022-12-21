const electron = require('electron')
const {app, BrowserWindow, ipcMain, ipcRenderer} = require("electron");
const fs = require('fs');
const path = require('path');

function createWindow () {

    const win = new BrowserWindow({
      width: 1000,
      height: 600,
      icon: './costume2.png',
      autoHideMenuBar: true,
      fullscreen: true,
      webPreferences: {
        nodeIntegration: true
      }
    })
  
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
  