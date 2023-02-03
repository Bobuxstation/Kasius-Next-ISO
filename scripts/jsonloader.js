window.$ = window.jQuery = require('jquery');
const electron = require('electron');
const remote = require('@electron/remote');
const app = remote.app;
let fs = require('fs');
const configDir =  app.getPath('userData');
console.log(configDir);

if (fs.existsSync(configDir + '/kasiuspkg.json')) {console.log('Package List Found!')
} else {
    console.log('Package List Is Not Found! Creating Package List...')
    let jsontemplate = {"packages":[
        {
            "name": "Files",
            "URL": "apps/files.html",
            "icon": "Icons/filesicon.png",
            "height": "450",
            "width": "800"
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
            "name": "Notes",
            "URL": "apps/notes.html",
            "icon": "Icons/notes.png",
            "height": 486,
            "width": 800

        }
    ],};
    let data = JSON.stringify(jsontemplate);
    fs.writeFileSync(configDir + '/kasiuspkg.json', data);
}

let jsonData = require(configDir + '/kasiuspkg.json');

function add(name, URL, icon, height, width) {
    var obj = (jsonData);
    obj['packages'].push({"name" : name, "URL" : URL, "icon" : icon, "height" : height, "width" : width});
    jsonStr = JSON.stringify(obj);
    console.log(jsonStr);
    fs.writeFile(configDir + '/kasiuspkg.json', jsonStr, (err) => { 
        if (err) { 
            console.log(err); 
        }
    });
};

window.onload = function() {
    fetch(configDir + '/kasiuspkg.json')
          .then((res) => {return res.json();})
          .then((data) => 
                    data.packages.forEach(items => {
                        let applist = document.getElementById("applist");
                        let btn = document.createElement("btn");
                        btn.className = "menubutton2"
                        btn.innerHTML = "<img style='height: 30px; width: 30px;' src='" + items.icon + "'></img> " + items.name;
                        btn.onclick = function() {
                            spawnwindow(items.name, items.URL, items.icon, items.height, items.width)
                        }
                        applist.appendChild(btn);
                    }));
}