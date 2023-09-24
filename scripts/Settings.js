var shutdown = new Audio('medias/shutdown.mp3');
var errorsound = new Audio("medias/error.mp3");

function zoom(val) {
  webFrame.setZoomLevel(webFrame.getZoomLevel() + val);
  document.getElementById('zoomMeter').innerText = webFrame.getZoomLevel();

  var obj = (desktopConfig);
  obj.zoomVal = webFrame.getZoomLevel();
  jsonStr = JSON.stringify(obj, null, "\t");
  console.log(jsonStr)
  fs.writeFile(configDir + '/desktopconfig.json', jsonStr, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

//load all settings
window.addEventListener('load', function () {
  document.getElementById("body").style.backgroundImage = `url(${desktopConfig.backgroundImage})`;
  document.getElementById("style").href = desktopConfig.theme;
  document.getElementById("footer").style.textAlign = desktopConfig.iconStyle;
  document.getElementById("menutogglebuttonimg").src = desktopConfig.footerIcon;

  webFrame.setZoomLevel(desktopConfig.zoomVal);
  document.getElementById('zoomMeter').innerText = desktopConfig.zoomVal;

  setTimeout(function () {
    document.getElementById('welcomescreen').style.display = "none";
  }, 3000);
})

//errormessage
function error(errormsg) {
  document.getElementById('errorbox').style.display = "flex";
  document.getElementById('errormessagetext').innerHTML = errormsg;
}
function hideerror() {
  document.getElementById('errorbox').style.display = "none";
}
//background
function bg(background) {
  document.getElementById("body").style.backgroundImage = "url(" + background + ")";

  var obj = (desktopConfig);
  obj.backgroundImage = background;
  jsonStr = JSON.stringify(obj, null, "\t");
  console.log(jsonStr)
  fs.writeFile(configDir + '/desktopconfig.json', jsonStr, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

//custom bg
function custom_bg(event) {
  var reader = new FileReader();
  reader.onload = function () {
    document.getElementById("body").style.backgroundImage = `url(${reader.result})`;

    var obj = (desktopConfig);
    obj.backgroundImage = reader.result;
    jsonStr = JSON.stringify(obj, null, "\t");
    fs.writeFile(configDir + '/desktopconfig.json', jsonStr, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  reader.readAsDataURL(event.target.files[0]);
}

//Color scheme
function cssimport() {
  b = document.getElementById("cssimport").value;

  if (document.getElementById("cssimport").value == "") {
    document.getElementById("style").href = 'style.css';
    document.getElementById("style").href = 'style.css';
    errorsound.play();
    error('Error: Unable to apply theme!');
  } else {
    document.getElementById("style").href = b;

    var obj = (desktopConfig);
    obj.theme = b;
    jsonStr = JSON.stringify(obj, null, "\t");
    fs.writeFile(configDir + '/desktopconfig.json', jsonStr, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

//themes

function theme1() {
  document.getElementById("style").href = "style.css";

  var obj = (desktopConfig);
  obj.theme = "style.css";
  jsonStr = JSON.stringify(obj, null, "\t");
  fs.writeFile(configDir + '/desktopconfig.json', jsonStr, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

//footer
function changelogo() {
  c = document.getElementById("changelogo").value;
  document.getElementById("menutogglebuttonimg").src = c;
  document.getElementById("menutogglebuttonimg").onerror = function () {
    document.getElementById("menutogglebuttonimg").src = 'https://zeankundev.github.io/KaOS-13/logo.svg';
    errorsound.play();
    error('Error: Image does not exist!');

    var obj = (desktopConfig);
    obj.footerIcon = 'https://zeankundev.github.io/KaOS-13/logo.svg';
    jsonStr = JSON.stringify(obj, null, "\t");
    fs.writeFile(configDir + '/desktopconfig.json', jsonStr, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  var obj = (desktopConfig);
  obj.footerIcon = c;
  jsonStr = JSON.stringify(obj, null, "\t");
  fs.writeFile(configDir + '/desktopconfig.json', jsonStr, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
function iconstyle(style) {
  document.getElementById("footer").style.textAlign = style;

  var obj = (desktopConfig);
  obj.iconStyle = style;
  jsonStr = JSON.stringify(obj, null, "\t");
  fs.writeFile(configDir + '/desktopconfig.json', jsonStr, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

//resolution
function setres() {
  launch("xrandr -s " + document.getElementById("resolutionselector").value)
}

//package installer
function installpackage() {
  add(
    document.getElementById("packagename").value,
    document.getElementById("packageurl").value,
    document.getElementById("packageicon").value,
    document.getElementById("windowheight").value,
    document.getElementById("windowwidth").value
  )
  error('The package has been installed successfully! Restart the session to launch the installed package');
}