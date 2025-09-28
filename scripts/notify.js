var notify = new Audio("assets/notification.mp3");

ipcMain.on('notify', (event, data) => {
    notifications(data.msg, data.app, data.isSilent)
})

function notifications(msg, app, isSilent) {
    var ul = document.getElementById("list");
    var li = document.createElement("li");

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let hour = today.getHours();
    let min = today.getMinutes();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (min < 10) min = '0' + min;
    const formattedToday = dd + '/' + mm + '/' + yyyy + '  ' + hour + ':' + min;

    li.classList.add('notification');
    li.classList.add('notificationMessage');
    li.innerHTML = "<p class='notificationDate'>" + `<b>${app || ""}</b> ` + formattedToday + "<p>" + msg;
    li.title = "Click to dismiss..."
    li.onclick = function () {
        li.remove();
    }

    ul.appendChild(li);
    notify.play();
    if (!isSilent) {
        document.getElementById("notifications").style.display = "block";
    }
}

notifications("Welcome To Kasius Next!", "System", true)