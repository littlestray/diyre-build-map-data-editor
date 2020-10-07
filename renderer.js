// jshint esversion: 6
//------------------------------------------------------------REQUIRES AND INIT

const osc = require("osc");
const { count, countReset } = require("console");
const { ipcRenderer } = require("electron");

// my includes
const { Turner, OscObject } = require("./classes.js");

//------------------------------------------------------------OSC PORT SETTINGS

let getIPAddresses = function () {
  let os = require("os"),
    interfaces = os.networkInterfaces(),
    ipAddresses = [];

  for (let deviceName in interfaces) {
    let addresses = interfaces[deviceName];
    for (let i = 0; i < addresses.length; i++) {
      let addressInfo = addresses[i];
      if (addressInfo.family === "IPv4" && !addressInfo.internal) {
        ipAddresses.push(addressInfo.address);
      }
    }
  }

  return ipAddresses;
};

let udpPort = new osc.UDPPort({
  // This is the port we're listening on.
  localAddress: "127.0.0.1",
  localPort: 57121,

  // SEND This is where sclang is listening for OSC messages.
  remoteAddress: "127.0.0.1",
  remotePort: 57120,
  metadata: true,
});

//---------------------------------------------------------OSC INIT & OPEN PORT
udpPort.on("ready", function () {
  let ipAddresses = getIPAddresses();

  console.log("Listening for OSC over UDP.");
  ipAddresses.forEach(function (address) {
    console.log(" Host:", address + ", Port:", udpPort.options.localPort);
  });
  ipcRenderer.send("wake", "from renderer!");
});

udpPort.on("message", function (oscMessage) {
  console.log(oscMessage);
});

udpPort.on("error", function (err) {
  console.log(err);
});

udpPort.open();

//----------------------------------------------------------------------CLASSES

//----------------------------------------------------------------------MY CODE

//-------------------------------------------------------------FIELDS

let backgroundColor = 0;
let tFrames = 0;

//--------------------------------------------------------SKETCH INIT

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
 }


//----------------------------------------------------------DRAW LOOP
function draw() {
  tFrames++;
  background(backgroundColor);
  text(key, 10, 10);
}
//--------------------------------------------------------------INPUT
function keyReleased() {
  //key events 
}

//--------------------------------------------------------------------FUNCTIONS

