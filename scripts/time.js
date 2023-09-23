function time() {
  var span = document.getElementById('span');
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  try {
    span.innerText = (" ") + ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2);
  } catch {}
};

setInterval(time)