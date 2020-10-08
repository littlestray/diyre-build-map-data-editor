// jshint esversion: 6
//------------------------------------------------------------REQUIRES AND INIT

const osc = require("osc");
const { count, countReset } = require("console");
const { ipcRenderer, ipcMain } = require("electron");

// my includes
//const {} = require("./classes.js");

//------------------------------------------------------------OSC PORT SETTINGS

//----------------------------------------------------------------------CLASSES

//----------------------------------------------------------------------MY CODE

//-------------------------------------------------------------FIELDS

let backgroundColor = 0
let tFrames = 0
let canvas, ctx

//--------------------------------------------------------SKETCH INIT

function setup() {
  
  canvas = document.getElementById("#Viewer")
  ctx = canvas.getContext("2d")
  background(0);
}
//----------------------------------------------------------DRAW LOOP
function draw() {
  tFrames++;
  
}
//--------------------------------------------------------------INPUT

//--------------------------------------------------------------------FUNCTIONS

function loadFile() {
  let svg = ipcRenderer.sendSync("loadFile", "loadFile");
  console.log(svg);
  drawSVG(canvas, ctx, svg)
  
}

function drawSVG (canvas, ctx, data) {
  var DOMURL = window.URL || window.webkitURL || window;
         var img1 = new Image();
         var svg = new Blob([data], {type: 'image/svg+xml'});
         var url = DOMURL.createObjectURL(svg);
         img1.onload = function() {
            ctx.drawImage(img1, 25, 70);
            DOMURL.revokeObjectURL(url);
         }
         img1.src = url;
}

//--------------------------------------------------------------EVENT LISTENERS

document.querySelector("#loadFile").addEventListener("click", () => {
  console.log(loadFile());
});

//----------------------------------------------------------------IPC LISTENERS
