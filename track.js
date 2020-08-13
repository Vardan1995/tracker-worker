const fs = require("fs")
const screenshot = require('screenshot-desktop')
// const ioHook = require('iohook');
const activeWindows = require('electron-active-window');
var socket = require('socket.io-client')('http://192.168.137.1:8080');
// const axios = require("axios")


function takeScreanshoot() { // Takes a screanshoots and send it to the server
    screenshot({ format: 'jpg' }).then(async (buf) => {
        let info = await activeWindowInfo()
        // socket.emit('sendd', { buf, info });
        ////

        socket.emit('sendd', { room: 1234, buf, info, workerID: "Emin Najaryan" });

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

const mysoket = "Emini soket"

socket.on('connect', () => {
    socket.emit('subscribe', { room: 1234, token: "llllllbbb", mysoket });

    socket.on("message", (data) => {
        console.log(data.message)
    })
    setInterval(() => {
        takeScreanshoot()
    }, 500);
})
