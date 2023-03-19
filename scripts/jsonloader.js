window.$ = window.jQuery = require('jquery');
const electron = require('electron');
const remote = require('@electron/remote');
const app = remote.app;
let fs = require('fs');
const configDir = app.getPath('userData');
console.log(configDir);

if (fs.existsSync(configDir + '/kasiuspkg.json')) {
    console.log('Package List Found!')
} else {
    console.log('Package List Is Not Found! Creating Package List...')
    let jsontemplate = {
        "packages": [
            {
                "name": "Files",
                "URL": "apps/files.html",
                "icon": "Icons/filesicon.png",
                "height": 450,
                "width": 800
            },
            {
                "name": "Kasius Type",
                "URL": "kasiustype/index.html",
                "icon": "kasiustype/logo.png",
                "height": 565,
                "width": 1200

            },
            {
                "name": "Media",
                "URL": "apps/MEDIA.html",
                "icon": "Icons/media.png",
                "height": 450,
                "width": 800

            },
            {
                "name": "Meme Maker",
                "URL": "apps/mememaker.html",
                "icon": "Icons/mememaker.png",
                "height": 450,
                "width": 600

            },
            {
                "name": "Store",
                "URL": "https://zeankundev.github.io/KaOS-Store/",
                "icon": "Icons/Store.png",
                "height": 450,
                "width": 600

            },
            {
                "name": "KasiusNet",
                "URL": "apps/kasiusnet.html",
                "icon": "Icons/browser.png",
                "height": 450,
                "width": 800

            },
            {
                "name": "Calculator",
                "URL": "apps/calc.html",
                "icon": "Icons/calc.png",
                "height": 350,
                "width": 300

            },
            {
                "name": "Notes",
                "URL": "apps/notes.html",
                "icon": "Icons/notes.png",
                "height": 486,
                "width": 800

            },
            {
                "name": "Terminal",
                "URL": "apps/gigashell.html",
                "icon": "Icons/terminal.png",
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
        "backgroundImage": "bg.jpg",
        "theme": "style.css",
        "iconStyle": "center",
        "footerIcon": "https://zeankundev.github.io/KaOS-13/logo.svg",
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