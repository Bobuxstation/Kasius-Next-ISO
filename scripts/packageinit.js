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
    var minimized = document.createElement("li");
    var close = document.createElement("button");
    var minimize = document.createElement("button");
    var appID = stringGen()

    //create window
    window.classList.add('window');
    window.id = name + appID;
    window.style.display = "block";

    //create header
    header.classList.add('header');
    header.style.width = width;
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
        hide(name + appID);
    }

    //create content div
    content.classList.add('content');

    //create webview
    webview.style.height = height;
    webview.style.width = width;
    webview.src = URL;
    webview.setAttribute("webpreferences", "contextIsolation=false");
    webview.setAttribute("nodeintegration", "");
    // webview.addEventListener('dom-ready', () => {
    //     webview.openDevTools()
    // })

    //create minimized icon
    minimized.innerHTML = "<button class='menubuttonminimized'>" + "<img style='height: 22.5px; width: 22.5px;' src='" + icon + "'></img>" + "</button>";
    minimized.onclick = function () {
        show(name + appID);
    }

    //append the elements
    section.prepend(window);
    window.appendChild(header);
    header.appendChild(close);
    header.appendChild(minimize)
    window.appendChild(content);
    content.appendChild(webview);
    footer.appendChild(minimized);

    //make the window draggable
    $(".window").draggable({
        handle: ".header",
        containment: "#body",
        opacity: 0.75
    });
}