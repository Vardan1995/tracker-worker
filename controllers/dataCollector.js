const fs = require("fs")
const screenshot = require('screenshot-desktop')
const { dialog } = require("electron")
// const ioHook = require('iohook');
const activeWindows = require('electron-active-window');
var socket = require('socket.io-client')('https://tracker-serv.herokuapp.com/?token=localstoregickvercnem');
// var socket = require('socket.io-client')(`http://192.168.137.1:8080?token=${localStorage.getItem("x-auth-token")}`);


function takeScreanshoot() { // Takes a screanshoots and send it to the server
    screenshot({ format: 'jpg' }).then(async (buf) => {
        let info = await activeWindowInfo()
        // socket.emit('sendd', { buf, info });
        ////

        socket.emit('sendd', { room: 1234, buf, info, workerID: "Vardan Bakhshyan" });

        ///
    }).catch((err) => {
        console.log(err);
    })
}


function activeWindowInfo() {// Takes the current running app`s name or another info
    return new Promise((resolve, reject) => {

        activeWindows().getActiveWindow().then((result) => {
            // console.log(result.windowName.split('-').slice(-1)[0])
            resolve(result.windowName)
        });
    })

}

// function keyboardMouse() {

//   ioHook.on("keypress", event => {
//     console.log(event.keychar);
//     // {keychar: 'f', keycode: 19, rawcode: 15, type: 'keypress'}
//   });
//   ioHook.start();
// }


const mysoket = "vardani socket"

socket.on('connect', () => {
    socket.emit('subscribe', { room: 1234, token: "blabalbal", mysoket });
    // socket.emit('mysoket', mysoket);

    socket.on("message", (data) => {
        // alert(data.message)
        dialog.showErrorBox("message from the Meneger", data.message)
    })

})

let myVar
function startTracker(bool) {
    if (bool) {

        myVar = setInterval(takeScreanshoot, 1000);
    } else {

        clearInterval(myVar);
    }
}

module.exports = {
    startTracker
};