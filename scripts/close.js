function hide(whattohide) {
  document.getElementById(whattohide).style.display = "none";
}
function show(whattoshow) {
  document.getElementById(whattoshow).style.display = "block";
}

function Closetestwindow6() {
  var x = document.getElementById("window6");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("minimizedsettings").style.display = "block";
  } else {
    x.style.display = "none";
    document.getElementById("minimizedsettings").style.display = "none";
  }
}
function menu() {
  var x = document.getElementById("Sidebar");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function NotificationMenu() {
  var x = document.getElementById("Sidebar2");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function Closetestwindowterminal() {
  var x = document.getElementById("terminal");
  if (x.style.display === "none") {
    document.getElementById("minimizedterminal").style.display = "block";
    x.style.display = "block";
  } else {
    x.style.display = "none";
    document.getElementById("minimizedterminal").style.display = "none";
  }
}