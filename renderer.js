const { ipcRenderer } = window.require("electron")

function startTracker(bool) {
  ipcRenderer.send("startTracker", bool)
}


let play = false
function start() {
  let start = document.getElementById("start").childNodes[0]
  if (!play) {
    start.src = "./images/icons8-pause-64.png"
    startTracker(true)
    play = true
  } else {
    start.src = "./images/icons8-play-64.png"
    startTracker(false)
    play = false
  }
}
