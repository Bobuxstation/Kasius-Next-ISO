function hide(whattohide) {
  document.getElementById(whattohide).style.display = "none";
}
function show(whattoshow) {
  document.getElementById(whattoshow).style.display = "block";
}

function focusWindow(windowElem) {
  const windows = document.querySelectorAll('.window');
  windows.forEach((elem) => elem.classList.remove('focused'));

  windowElem.classList.add('focused');
}

function toggleSearch() {
  var x = document.getElementById("searchbox");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function menu() {
  var x = document.getElementById("Sidebar");
  if (x.style.display === "none") {
    x.style.display = "block";
    loadApps('')
  } else {
    x.style.animation = '0.25s ease 0s 1 normal none running slidedown'
    setTimeout(() => {
      x.style.display = "none";
      x.style.animation = ''
    }, 250);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === 'Meta') {
    menu()
  }
});
function NotificationMenu() {
  var x = document.getElementById("Sidebar2");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.animation = '0.25s ease 0s 1 normal none running slideleft'
    setTimeout(() => {
      x.style.display = "none";
      x.style.animation = ''
    }, 250);
  }
}