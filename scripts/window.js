var appDebugMode = false;
var shortcutAdded = false;
var currDesktop = 1;

function stringGen() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 512; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function setDesktop(number) {
    const windows = document.getElementsByClassName("window");
    const taskbuttons = document.getElementsByClassName("menubuttonminimized");
    const desktopButton = document.getElementsByClassName("desktopButton");

    Object.values(windows).forEach((item) => {
        if (item.getAttribute('desktop') == number) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });


    Object.values(taskbuttons).forEach((item) => {
        if (item.getAttribute('desktop') == number) {
            item.style.display = "inline-block";
        } else {
            item.style.display = "none";
        }
    });

    Object.values(desktopButton).forEach((item) => {
        if (item.innerHTML == number) {
            item.classList.add("selectedDesktop");
        } else {
            item.classList.remove("selectedDesktop");
        }
    });

    currDesktop = number;
}

function spawnwindow(name, URL, icon, height, width) {
    //configure elements
    var section = document.getElementById("section");
    var footer = document.getElementById("footer1");
    var windowelem = document.createElement("div");
    var header = document.createElement("div");
    var content = document.createElement("div");
    var webview = document.createElement("webview");
    var minimized = document.createElement("button");
    var close = document.createElement("button");
    var maximize = document.createElement("button");
    var minimize = document.createElement("button");
    var appID = stringGen()
    var lastTop
    var lastLeft
    var lastWidth
    var lastHeight

    //create window
    windowelem.classList.add('window');
    windowelem.setAttribute('desktop', currDesktop);
    windowelem.id = appID;
    windowelem.style.display = "block";
    windowelem.style.opacity = 1
    windowelem.onclick = function () {
        focusWindow(windowelem)
    }

    //create header
    header.classList.add('header');
    header.innerHTML = "<button class='headertext'>" + name + "</button>";

    //create close button
    close.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    close.classList.add('closebutton');
    close.onclick = function () {
        $(`#${windowelem.id}`).effect('fade', {}, 125, function () {
            windowelem.remove();
            minimized.remove();
        })
    }

    //create maximize button
    maximize.innerHTML = '<i class="fa-regular fa-window-maximize"></i>';
    maximize.classList.add('minimize');
    maximize.onclick = function () {
        if (content.style.width == '100vw' && content.style.height == window.innerHeight - 55 - 29.5 + 'px') {
            content.style.height = lastHeight;
            content.style.width = lastWidth;

            windowelem.style.left = lastLeft
            windowelem.style.top = lastTop

            $('#body').effect('transfer', { to: `#${windowelem.id}`, className: "ui-effects-transfer" }, 125)
        } else {
            $(`#${windowelem.id}`).effect('transfer', { to: `#body`, className: "ui-effects-transfer" }, 125, function () {
                lastLeft = windowelem.style.left
                lastTop = windowelem.style.top
    
                lastHeight = content.style.height;
                lastWidth = content.style.width;
    
                windowelem.style.left = ''
                windowelem.style.top = ''
    
                content.style.width = '100vw'
                content.style.height = window.innerHeight - 55 - 29.5 + 'px'
            })
        }
    }

    //create minimize button
    minimize.innerHTML = '<i class="fa-solid fa-window-minimize"></i>';
    minimize.classList.add('minimize');
    minimize.onclick = function () {
        minimized.className = "menubuttonminimized"
        windowelem.style.opacity = 0
        windowelem.style.pointerEvents = 'none'
        $(`#${windowelem.id}`).effect('transfer', { to: `#${minimized.id}`, className: "ui-effects-transfer" }, 125);
    }

    //create content div
    content.classList.add('content');
    content.style.height = height;
    content.style.width = width;
    windowelem.style.top = (window.innerHeight / 2) - (height / 2) - 29.5
    windowelem.style.left = (window.innerWidth / 2) - (width / 2)

    //create webview
    webview.src = URL;
    webview.setAttribute("webpreferences", "contextIsolation=false");
    webview.setAttribute("nodeintegration", "");
    webview.setAttribute("preload", "scripts/NextSDKInjector.js");
    webview.style.background = "lightgray";
    webview.addEventListener('did-finish-load', function () {
        webview.style.background = "none";
        if (appDebugMode == true) {
            webview.openDevTools()
        }
    });

    //create minimized icon    
    minimized.setAttribute('desktop', currDesktop);
    minimized.innerHTML = "<img style='height: 22.5px; width: 22.5px;' src='" + icon + "'></img>";
    minimized.className = "menubuttonminimized menubuttonminimizing"
    minimized.id = "ICON_" + appID;
    minimized.onclick = function () {
        if (windowelem.style.opacity == 0) {
            $(`#${minimized.id}`).effect('transfer', { to: `#${windowelem.id}`, className: "ui-effects-transfer" }, 125, function () {
                windowelem.style.animation = 'none'
                windowelem.style.opacity = 1
                windowelem.style.pointerEvents = ''
            });
        }

        minimized.className = "menubuttonminimized menubuttonminimizing"
        focusWindow(windowelem)
    }

    //append the elements
    section.prepend(windowelem);

    windowelem.appendChild(header);
    header.appendChild(close);
    header.appendChild(maximize);
    header.appendChild(minimize)

    windowelem.appendChild(content);
    content.appendChild(webview);
    footer.appendChild(minimized);

    //focus on the window
    focusWindow(windowelem)

    //make the window draggable
    $(".window").draggable({
        handle: ".header",
        containment: "#body",
        opacity: 0.75
    });

    $(content).resizable({
        minHeight: height,
        containment: "#body",
        minWidth: width
    });
}

function loadApps(searchQuery) {
    fetch(configDir + '/kasiuspkg.json')
        .then((res) => { return res.json(); })
        .then((data) => {
            applist.innerHTML = `
                <p style="text-align: center;" class="notification">
                    <i class="fa-solid fa-right-from-bracket" style="float: right; margin: 2px;" onclick="shutdown.play(); setTimeout(function () {window.location.replace('index.html')}, 1000);"></i>
                    <i class="fa-solid fa-search" style="float: left; margin: 2px;" onclick="toggleSearch()"></i>
                    <span id="span">${require("os").userInfo().username}</span>
                </p>
                <input class="notification" id="searchbox" style="display: none;" onchange="loadApps(this.value)" value="${searchQuery}" placeholder="Search Apps">
            `
            data.packages.forEach(items => {
                let applist = document.getElementById("applist");

                let btn = document.createElement("btn");
                btn.className = "menubutton2"
                btn.innerHTML = "<img style='height: 27px; width: 27px;' src='" + items.icon + "'></img> <span>" + items.name + "</span>";
                btn.onclick = function () {
                    spawnwindow(items.name, items.URL, items.icon, items.height, items.width)
                    menu()
                }

                let shortcut = document.createElement("btn");
                shortcut.className = "menubutton2 shortcut"
                shortcut.innerHTML = "<img style='height: 50px; width: 50px;' src='" + items.icon + "'></img>";
                shortcut.onclick = function () {
                    spawnwindow(items.name, items.URL, items.icon, items.height, items.width)
                }

                let nameOfApp = items.name.toLowerCase()
                if (nameOfApp.includes(searchQuery.toLowerCase())) {
                    applist.appendChild(btn);
                    if (!shortcutAdded) {
                        //document.getElementById("section").appendChild(shortcut)
                    }
                }
            })
            shortcutAdded = true
        });
}

window.onload = function () {
    loadApps('')
}