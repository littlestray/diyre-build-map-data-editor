// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

const { powerSaveBlocker } = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))



//---------------------------------------------------------------------SOCKET-IO
const { ipcMain } = require('electron');
const io = require('socket.io-client');

let socket = io("https://socket-max-hole.glitch.me/");
let room = "perlinBois";
socket.on('connect', () => {
  console.log("the socket is connected"); // true
   socket.emit("maxjoin", "hello");
   socket.emit("leaveRoom", 'wholemaxhole');
	 socket.emit("joinRoom", room);

});

socket.on('error', (error) => {
  console.log(error);
});


ipcMain.on('wake', (event, arg) => {
  console.log(arg) // prints "ping"
  
})

ipcMain.on('data', (event, arg) => {
  //console.log(arg) // prints "ping"

  socket.emit("to_room", room, arg);
  
})

//-----------------------------------------------------------------END SOCKET IO

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      resizable: false,
      preload: path.join(__dirname, 'preload.js'),
      frame: false,
      backgroundThrottling: false,
      nodeIntegration: true
    }
  });
  //mainWindow.
  mainWindow.setResizable(false);
  mainWindow.show();


  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
