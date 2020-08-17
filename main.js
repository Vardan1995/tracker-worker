const { app, BrowserWindow, ipcMain } = require("electron")
const dataCollector = require("./controllers/dataCollector")
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    // frame: false,
    webPreferences: {
      // webSecurity: false,
      nodeIntegration: true,

    }
  })
  mainWindow.loadFile("index.html")
  // mainWindow.webContents.openDevTools()
  mainWindow.removeMenu()
}

app.whenReady().then(() => {
  createWindow()

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.on('startTracker', (event, arg) => {
    dataCollector.startTracker(arg)
  })
})

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit()
})
