function stringGen() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 12; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function spawnwindow(name, URL, icon, height, width) {
    //configure elements
    var section = document.getElementById("section");
    var footer = document.getElementById("footer1");
    var window = document.createElement("div");
    var header = document.createElement("div");
    var content = document.createElement("div");
    var webview = document.createElement("webview");
    var minimized = document.createElement("button");
    var close = document.createElement("button");
    var minimize = document.createElement("button");
    var appID = stringGen()

    //create window
    window.classList.add('window');
    window.id = name + appID;
    window.style.display = "block";
    window.onclick = function () {
        focusWindow(window)
    }

    //create header
    header.classList.add('header');
    header.innerHTML = "<button class='headertext'>" + name + "</button>";

    //create close button
    close.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    close.classList.add('closebutton');
    close.onclick = function () {
        window.remove();
        minimized.remove();
    }

    //create minimize button
    minimize.innerHTML = '<i class="fa-solid fa-window-minimize"></i>';
    minimize.classList.add('minimize');
    minimize.onclick = function () {
        window.style.display = "none"
        minimized.className = "menubuttonminimized"
    }

    //create content div
    content.classList.add('content');
    content.style.height = height;
    content.style.width = width;

    //create webview
    webview.src = URL;
    webview.setAttribute("webpreferences", "contextIsolation=false");
    webview.setAttribute("nodeintegration", "");
    // webview.addEventListener('did-finish-load', function () {
    //     webview.openDevTools()
    // });

    //create minimized icon
    minimized.innerHTML = "<img style='height: 22.5px; width: 22.5px;' src='" + icon + "'></img>";
    minimized.className = "menubuttonminimized menubuttonminimizing"
    minimized.onclick = function () {
        window.style.display = "block"
        minimized.className = "menubuttonminimized menubuttonminimizing"
    }

    //append the elements
    section.prepend(window);
    window.appendChild(header);
    header.appendChild(close);
    header.appendChild(minimize)
    window.appendChild(content);
    content.appendChild(webview);
    footer.appendChild(minimized);

    //focus on the window
    focusWindow(window)

    //make the window draggable
    $(".window").draggable({
        handle: ".header",
        containment: "#body",
        opacity: 0.75
    });

    $( content ).resizable({
        minHeight: height,
        minWidth: width
    });
}

function loadApps(searchQuery) {
    fetch(configDir + '/kasiuspkg.json')
    .then((res) => { return res.json(); })
    .then((data) => {
        applist.innerHTML = `
        <p style="text-align: center;" class="notification">
            <i class="fa-solid fa-right-from-bracket" style="float: right;" onclick="shutdown.play(); setTimeout(function () {window.location.replace('index.html')}, 1000);"></i>
            <i class="fa-solid fa-search" style="float: left;" onclick="toggleSearch()"></i>
            <span id="span"></span>
        </p>
        <input class="notification" id="searchbox" style="display: none;" onchange="loadApps(this.value)" value="${searchQuery}" placeholder="Search Apps">
        
        <button onclick="Closetestwindow6(); menu()" class="menubutton2">
            <img src="Icons/settings.png"style="height: 30px; width: 30px;"> Settings</img>
        </button>
        `
        data.packages.forEach(items => {
            let applist = document.getElementById("applist");
            let btn = document.createElement("btn");
            btn.className = "menubutton2"
            btn.innerHTML = "<img style='height: 30px; width: 30px;' src='" + items.icon + "'></img> " + items.name;
            btn.onclick = function () {
                spawnwindow(items.name, items.URL, items.icon, items.height, items.width)
                menu()
            }
            let nameOfApp = items.name.toLowerCase()
            if (nameOfApp.includes(searchQuery)) {
                applist.appendChild(btn);
            }
        })
    });
}

window.onload = function () {
    loadApps('')
}