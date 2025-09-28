const { webFrame } = require('electron');
const electron = require('electron');
const remote = require('@electron/remote');
const app = remote.app;
const fs = require('fs');
const configDir = app.getPath('userData');
const ipcMain = remote.ipcMain

window.$ = window.jQuery = require('jquery');
console.log(configDir);

if (fs.existsSync(configDir + '/kasiuspkg.json')) {
    console.log('Package List Found!')
} else {
    console.log('Package List Is Not Found! Creating Package List...')
    let jsontemplate = {
        "packages": [
            {
                "name": "Calculator",
                "URL": "apps/calc.html",
                "icon": "apps/icons/calc.png",
                "height": 350,
                "width": 300

            },
            {
                "name": "Settings",
                "URL": "apps/settings.html",
                "icon": "apps/icons/settings.png",
                "height": 450,
                "width": 800

            },
            {
                "name": "Files",
                "URL": "apps/files.html",
                "icon": "apps/icons/filesicon.png",
                "height": 450,
                "width": 800
            },
            {
                "name": "Media",
                "URL": "apps/MEDIA.html",
                "icon": "apps/icons/media.png",
                "height": 450,
                "width": 800

            },
            {
                "name": "Notes",
                "URL": "apps/notes.html",
                "icon": "apps/icons/notes.png",
                "height": 450,
                "width": 800

            },
            {
                "name": "Package Manager",
                "URL": "apps/store.html",
                "icon": "apps/icons/Store.png",
                "height": 450,
                "width": 800
            },
            {
                "name": "Paint",
                "URL": "apps/paint.html",
                "icon": "apps/icons/paint.png",
                "height": 450,
                "width": 800
            },
            {
                "name": "Terminal",
                "URL": "apps/gigashell.html",
                "icon": "apps/icons/terminal.png",
                "height": 450,
                "width": 800

            }
        ]
    };
    let data = JSON.stringify(jsontemplate, null, "\t");
    fs.writeFileSync(configDir + '/kasiuspkg.json', data);
}

if (fs.existsSync(configDir + '/desktopconfig.json')) {
    console.log('Package List Found!')
} else {
    console.log('Package List Is Not Found! Creating Package List...')
    let jsontemplate = {
        "backgroundImage": "assets/bg.jpg",
        "theme": "assets/style.css",
        "iconStyle": "center",
        "footerIcon": "assets/logo.svg",
        "zoomVal": 0,
        "autoHideNavbar": false
    };
    let data = JSON.stringify(jsontemplate, null, "\t");
    fs.writeFileSync(configDir + '/desktopconfig.json', data);
}

let jsonData = require(configDir + '/kasiuspkg.json');
let desktopConfig = require(configDir + '/desktopconfig.json');

function add(name, URL, icon, height, width) {
    var obj = (jsonData);
    obj['packages'].push({ "name": name, "URL": URL, "icon": icon, "height": height, "width": width });
    jsonStr = JSON.stringify(obj, null, "\t");
    console.log(jsonStr);
    fs.writeFile(configDir + '/kasiuspkg.json', jsonStr, (err) => {
        if (err) {
            console.log(err);
        }
    });
};