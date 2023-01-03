const { exec, spawn } = require('child_process');

function launch(executablePath) {
    exec(executablePath, function(err, data) {
        if(err){
           console.error(err);
           returnerrortoterminal(err);
           return;
        }
     
        returntoterminal(data.toString());
    });
}
function redirect(redirectlink) {
    window.location.replace(redirectlink)
}