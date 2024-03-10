const { ipcRenderer } = require('electron');

window.kasiusAPI = {
    notify(msg, app, isSilent) {
        ipcRenderer.send('notify', {"msg": msg, "app": app, "isSilent": isSilent});
    }
}