var notify = new Audio("medias/notification.mp3");
var ul = document.getElementById("list");
var li = document.createElement("li");
li.classList.add('notification');
li.appendChild(document.createTextNode("Welcome To Kasius Next!"));

li.onclick = function () {
    li.remove();
}
ul.appendChild(li);

function notifications(msg) {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.classList.add('notification');
    li.innerHTML = msg;
    li.onclick = function () {
        li.remove();
    }
    ul.appendChild(li);
    notify.play();
    document.getElementById("Sidebar2").style.display = "block";
}
function notifybeta() {
    notificationvar = document.getElementById('notifybeta').value;
    notifications(notificationvar);
}