// jshint esversion: 6
//------------------------------------------------------------REQUIRES AND INIT

const osc = require("osc");
const { count, countReset } = require("console");
const { ipcRenderer, ipcMain } = require("electron");
const { SVG } = require("@svgdotjs/svg.js");
let drawSVG = SVG().addTo('body').size(300, 300)


// my includes
//const {} = require("./classes.js");

//------------------------------------------------------------OSC PORT SETTINGS

//----------------------------------------------------------------------CLASSES

//----------------------------------------------------------------------MY CODE

//-------------------------------------------------------------FIELDS


//--------------------------------------------------------------INPUT
let svg
//--------------------------------------------------------------------FUNCTIONS
function loadFile() {
  let svgPath = ipcRenderer.sendSync("loadFile", "loadFile")
  console.log(svgPath)
  let image = drawSVG.image(svgPath)

  console.log(image)

}
//--------------------------------------------------------------EVENT LISTENERS

document.querySelector("#loadFile").addEventListener("click", () => {
  console.log(loadFile())
})

//----------------------------------------------------------------IPC LISTENERS
