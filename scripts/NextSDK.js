var notify = new Audio("assets/notification.mp3");

ipcMain.on('notify', (event, data) => {
    notifications(data.msg, data.app, data.isSilent)
})

function notifications(msg, app, isSilent) {
    var ul = document.getElementById("list");
    var li = document.createElement("li");

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let min = today.getMinutes();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (min < 10) min = '0' + min;

    const formattedToday = dd + '/' + mm + '/' + today.getFullYear() + '  ' + today.getHours() + ':' + min;

    li.classList.add('notification');
    li.classList.add('notificationMessage');
    li.innerHTML = "<p class='notificationDate'>" + `<b>${app || ""}</b> ` + formattedToday + "<p>" + msg;
    li.title = "Click to dismiss...";
    li.onclick = function () {
        li.remove();
    }

    ul.appendChild(li);
    if (!isSilent) {
        document.getElementById("notifications").style.display = "block";
        notify.play();
    }
}

notifications("Welcome To Kasius Next!", "System", true)