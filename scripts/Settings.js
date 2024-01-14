var shutdown = new Audio('medias/shutdown.mp3');
var errorsound = new Audio("medias/error.mp3");
var WiFiControl = require('wifi-control');

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
  }, 0);
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
    document.getElementById("menutogglebuttonimg").src = 'logo.svg';
    errorsound.play();
    error('Error: Image does not exist!');

    var obj = (desktopConfig);
    obj.footerIcon = 'logo.svg';
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

async function getBatteryInfo() {
  const battery = await navigator.getBattery();
  const batteryDiv = document.getElementById("batteryInfo")
  const percentage = Math.floor(battery.level * 100)

  var batterySymbol = `<i class="fa-solid fa-battery-full"></i> `
  var batteryCharging = ``

  if (percentage == 100) {
    batterySymbol = `<i class="fa-solid fa-battery-full"></i> `
  } else if (percentage < 100 && percentage >= 75) {
    batterySymbol = `<i class="fa-solid fa-battery-three-quarters"></i> `
  } else if (percentage < 75 && percentage >= 50) {
    batterySymbol = `<i class="fa-solid fa-battery-half"></i> `
  } else if (percentage < 50 && percentage >= 25) {
    batterySymbol = `<i class="fa-solid fa-battery-quarter"></i> `
  } else if (percentage < 25 && percentage >= 0) {
    batterySymbol = `<i class="fa-solid fa-battery-empty"></i> `
  }

  if (battery.charging == true) {
    batteryCharging = ` <span class="notificationDate">Charging...</span>`
  }

  batteryDiv.innerHTML = batterySymbol + percentage + "%" + batteryCharging;
  battery.onchargingchange = getBatteryInfo;
  battery.onchargingtimechange = getBatteryInfo;
  battery.ondischargingtimechange = getBatteryInfo;
  battery.onlevelchange = getBatteryInfo;
}

function refreshWifiPicker() {
  const WiFiDiv = document.getElementById("internetSettings")

  WiFiControl.init({ debug: false });
  WiFiControl.scanForWiFi(function (err, response) {
    if (err) {
      WiFiDiv.innerText = "Could not find Wi-Fi adapter!";
      return
    };

    WiFiDiv.innerText = "";
    response.networks.forEach((element, i) => {
      var ssid = document.createElement('p')
      var ssidclicked = false
      var ssidConnected = ``

      if (WiFiControl.getIfaceState().ssid == element.ssid) {
        ssidConnected = ` <span class="notificationDate">Connected</span>`
      }

      ssid.innerHTML = `<i class="fa-solid fa-wifi"></i> ` + element.ssid + ssidConnected;

      ssid.onclick = function () {
        if (ssidclicked) return;
        ssidclicked = true

        var input = document.createElement('input')
        input.placeholder = "Enter Wi-Fi password..."
        input.style.width = "100%"

        ssid.appendChild(document.createElement('br'))
        ssid.appendChild(document.createElement('br'))
        ssid.appendChild(input)

        input.onkeydown = function (e) {
          var _ap = {
            ssid: element.ssid,
            password: input.value
          };

          if (e.key === 'Enter') {
            input.disabled = true;
            WiFiControl.connectToAP(_ap, function (err, response) {
              if (err) {
                refreshWifiPicker()
                console.log(err)
                error(err)
              };

              refreshWifiPicker()
            });
          }
        }
      }

      WiFiDiv.appendChild(ssid)
      if ((i + 1) != response.networks.length) {
        WiFiDiv.appendChild(document.createElement('br'))
      }
    });
  });
}
refreshWifiPicker()