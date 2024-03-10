var shutdown = new Audio('medias/shutdown.mp3');
var errorsound = new Audio("medias/error.mp3");
var WiFiControl = require('wifi-control');
var latestConfig

//load all settings
window.addEventListener('load', function () {
  document.getElementById("body").style.backgroundImage = `url(${desktopConfig.backgroundImage})`;
  document.getElementById("style").href = desktopConfig.theme;
  document.getElementById("footer").style.textAlign = desktopConfig.iconStyle;
  document.getElementById("menutogglebuttonimg").src = desktopConfig.footerIcon;
  webFrame.setZoomLevel(desktopConfig.zoomVal);
  latestConfig = desktopConfig

  setTimeout(function () {
    document.getElementById('welcomescreen').style.display = "none";
  }, 0);

  setInterval(async () => {
    const fetchconfig = await fetch(configDir + '/desktopconfig.json')
    const newDesktopConfig = await fetchconfig.json()
    
    if (JSON.stringify(newDesktopConfig) == JSON.stringify(latestConfig)) return;
    latestConfig = newDesktopConfig

    document.getElementById("body").style.backgroundImage = `url(${newDesktopConfig.backgroundImage})`;
    document.getElementById("style").href = newDesktopConfig.theme;
    document.getElementById("footer").style.textAlign = newDesktopConfig.iconStyle;
    document.getElementById("menutogglebuttonimg").src = newDesktopConfig.footerIcon;
    webFrame.setZoomLevel(newDesktopConfig.zoomVal);
  }, 250);
})

//errormessage
function error(errormsg) {
  document.getElementById('errorbox').style.display = "flex";
  document.getElementById('errormessagetext').innerHTML = errormsg;
}

function hideerror() {
  document.getElementById('errorbox').style.display = "none";
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

  WiFiControl.init({ debug: true });
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