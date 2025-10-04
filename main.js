const electron = require('electron')
const { app, BrowserWindow, ipcMain, ipcRenderer, screen } = require("electron");
const fs = require('fs');
const path = require('path');
var win

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    icon: './costume2.png',
    autoHideMenuBar: true,
    width: width,
    height: height,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      devTools: true,
      contextIsolation: false,
      nodeIntegrationInSubFrames: true,
      nodeIntegrationInWorker: true,
      webviewTag: true
    }
  })
  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(win.webContents)

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  app.allowRendererProcessReuse = false;
  createWindow()
  screen.on('display-metrics-changed', (event, display, changedMetrics) => {
    if (changedMetrics.size && !currentScreenSize.equals(changedMetrics.size)) {
      const { width, height } = screen.getPrimaryDisplay().workAreaSize;
      win.setSize(width, height)
    }
  });
});

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
