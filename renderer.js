//------------------------------------------------------------REQUIRES AND INIT

const osc = require("osc");
const { count, countReset } = require("console");
const { ipcRenderer, ipcMain } = require("electron");
const { SVG } = require("@svgdotjs/svg.js");
const fs = require("fs")

// my includes
//const {} = require("./classes.js");

//----------------------------------------------------------------------CLASSES
class DataFile {

  constructor(svgDoc) {

    this.svgDoc = svgDoc
    this.coms = this.prepData(this.svgDoc)
    this.steps = {
      1: "<a href='https://www.diyrecordingequipment.com/pages/PRODUCTNAME/#Bag1' target='_blank'></a>",
      2: "<a href='https://www.diyrecordingequipment.com/pages/PRODUCTNAME/#Bag1' target='_blank'></a>",
      3: "<a href='https://www.diyrecordingequipment.com/pages/PRODUCTNAME/#Bag1' target='_blank'></a>",
      4: "<a href='https://www.diyrecordingequipment.com/pages/PRODUCTNAME/#Bag1' target='_blank'></a>",
      5: "<a href='https://www.diyrecordingequipment.com/pages/PRODUCTNAME/#Bag1' target='_blank'></a>",
      6: "<a href='https://www.diyrecordingequipment.com/pages/PRODUCTNAME/#Bag1' target='_blank'></a>",
      "T1": ["Bag#.#", "Component #"],
      "T2": ["Bag#.#", "Component #"],
      "T3": ["Bag#.#", "Component #"],
      "T4": ["Bag#.#", "Component #"],
      "T5": ["Bag#.#", "Component #"],
      "T6": ["Bag#.#", "Component #"]
    }

  }

  prepData(doc, index = 0) {

    let object = {}

    let targetTags = ["g", "path", "rect", "polygon"]

    //let temp  = doc.getElementsByTagName("g", "path", "rect", "polygon")
    
    let temp = []

    for(let x in targetTags){

      temp = temp.concat([...doc.getElementsByTagName(targetTags[x])])
      console.log(temp.length)

    }


    //filter out id-less and LW_POLYLINE
    //filter our CIRCLES and SOLIDS
    temp = temp.filter(
      x => x.id
        && x.id.substring(0, 2) != "LW"
        && x.id.substring(0, 6)  != "CIRCLE"
        && x.id.substring(0, 5)  != "SOLID"
        && x.id.substring(0, 5)  != "PARTS"
        && x.id.substring(0, 5)  != "Board"
        && x.id.substring(0, 10) != "Silkscreen"
        && x.id.substring(0, 4)  != "Pads")


    for (let x in temp) {

      let id = temp[x].id
      let obj = {}

      if (temp[x].id.substring(0, 2) === "MB" || temp[x].id.substring(0, 2) === "DB") {
        obj[temp[x].id] = {
          "type": "PCB"
        }
        temp[x] = obj
      } else if (temp[x].id.substring(0, 3) === "TOP" || temp[x].id.substring(0, 3) === "BOT") {
        obj[temp[x].id] = {
          "type": "SIDE"
        }
        temp[x] = obj
      } else if (temp[x].id.substring(0, 3) === "BG") {
        obj[temp[x].id] = {
          "type": "BG"
        }
        temp[x] = obj
      } else {
        obj[temp[x].id] = {
          "type": "COM",
          "val": "---",
          "step": "1",
          "alt-name": temp[x].id
        }
        temp[x] = obj
      }
    }

    object = temp

    return object;

  }

}
class Com {



  constructor() {

  }


}
//----------------------------------------------------------------------MY CODE

//-------------------------------------------------------------FIELDS
const parser = new DOMParser()
let image, svgData, dataFile
//--------------------------------------------------------------INPUT

//--------------------------------------------------------------------FUNCTIONS
function loadSVGFile() {
  svgData = ipcRenderer.sendSync("loadFile", "loadFile")
  if (svgData) {
    image = parser.parseFromString(svgData, 'image/svg+xml')
    dataFile = new DataFile(image)
  }
}

function saveDataFile() {

  let tempOutput = {}
  tempOutput["coms"] = {}
  tempOutput["steps"] = {}

  for (let x in dataFile.coms) {
    //tempOutput["coms"][x] = dataFile.coms[x]
    let temp = dataFile.coms[x]
    console.log(Object.keys(temp)[0])
    tempOutput["coms"][Object.keys(temp)[0]] = dataFile.coms[x][Object.keys(temp)[0]]
  }

  for (let x in dataFile.steps) {
    console.log(x)
    tempOutput["steps"][x] = dataFile.steps[x]
  }

  fs.writeFileSync(__dirname + "/assets/output.json", JSON.stringify(tempOutput));




}
//--------------------------------------------------------------EVENT LISTENERS

document.querySelector("#loadFile").addEventListener("click", () => {
  console.log(loadSVGFile())
})

document.querySelector("#saveData").addEventListener("click", () => {
  console.log(saveDataFile())
})

//----------------------------------------------------------------IPC LISTENERS
