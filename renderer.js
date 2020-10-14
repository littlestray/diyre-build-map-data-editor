// jshint esversion: 6
//------------------------------------------------------------REQUIRES AND INIT

const osc = require("osc");
const { count, countReset } = require("console");
const { ipcRenderer, ipcMain } = require("electron");
const { SVG } = require("@svgdotjs/svg.js");
const fs = require("fs")
//const $ = require("jquery")
let drawSVG = SVG().addTo('body').size(300, 300)


// my includes
//const {} = require("./classes.js");

//----------------------------------------------------------------------CLASSES

//----------------------------------------------------------------------MY CODE

//-------------------------------------------------------------FIELDS


//--------------------------------------------------------------INPUT
let image
let svgData
let parser = new DOMParser()
let output = document.getElementById("output")
//--------------------------------------------------------------------FUNCTIONS
function loadFile() {
  let svgPath = ipcRenderer.sendSync("loadFile", "loadFile")
  console.log(svgPath)
  //image = drawSVG.image(svgPath)
  svgData = fs.readFileSync(svgPath)
  image = parser.parseFromString(svgData.toString(), "image/svg+xml")
  image = image.getElementsByTagName("g", "path")
  output.innerHTML = image[0].toString()
  

}
//--------------------------------------------------------------EVENT LISTENERS

document.querySelector("#loadFile").addEventListener("click", () => {
  console.log(loadFile())
})

//----------------------------------------------------------------IPC LISTENERS
