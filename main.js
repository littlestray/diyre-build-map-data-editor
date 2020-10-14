// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog } = require("electron")
const path = require("path")
const fs = require("fs")
const jsdom = require("jsdom");


// const { powerSaveBlocker } = require("electron")

// const id = powerSaveBlocker.start("prevent-display-sleep")
// console.log(powerSaveBlocker.isStarted(id))

//----------------------------------------------------------------------IPC-I/Os
const { ipcMain } = require("electron")

ipcMain.on("loadFile", (event, args) => {
  console.log(`${args}`)

  let svg = dialog.showOpenDialogSync()
  if(svg === undefined){
    console.log("invalid file path")
  } else {
  let svgPath = svg[0]
  console.log(svgPath)

  let svgData = fs.readFileSync(svgPath)
  // svgData = parser.parseFromString(svgData.toString(), "image/svg+xml")
  event.returnValue = svgData.toString()
  }
  event.returnValue = null
  
});

console.log(path.join(__dirname, "preload.js"))

//------------------------------------------------------------------------END IO

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      resizable: true,
      preload: path.join(__dirname, "preload.js"),
      frame: true,
      backgroundThrottling: false,
      nodeIntegration: true,
    },
  });

  mainWindow.setResizable(true);
  mainWindow.show();

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
