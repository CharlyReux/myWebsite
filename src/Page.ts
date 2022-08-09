import './style.css'
import { createTab, startRotate, stopRotate } from './readme';


window.addEventListener('load', () => {
  document.body.style.visibility = ""
});


var divRead = document.getElementById("cnv")!
const canvaselem = <HTMLCanvasElement>document.getElementById("rd")!

createBackGroundCube()
function createBackGroundCube() {

  //makeitBackground
  var dataurl = canvaselem.toDataURL();
  divRead.style.background = 'url(' + dataurl + ')'

  divRead.style.backgroundRepeat = "no-repeat";
  divRead.style.backgroundAttachment = "fixed";
  divRead.style.backgroundSize = "contain";
}

//Storing the former scrolled value
var FormerScroll = 0

///ONCLICK backmenu event
divRead.addEventListener("click", zoomIn)
$("#backMenu").prop("disabled", true);
function zoomIn() {
  FormerScroll = document.documentElement.scrollTop
  canvaselem.style.zIndex = "1"
  $("#backMenu").animate({ left: "5%" }, 500)
  $(".arrow").animate({ bottom: "5%" })
  $("#ReadmeCounter").animate({ bottom: "5%" })
  $("#backMenu").prop("disabled", false);
  var textReadMe = document.getElementById("readmeText");
  textReadMe!.style.display = "flex"
  var mainText = document.getElementById("main");
  mainText!.style.display = "none"
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  startRotate()
}


var backMenuButton = document.getElementById("backMenu")
backMenuButton?.addEventListener("click", goBackMenu)
function goBackMenu() {
  canvaselem.style.zIndex = "-1"
  $("#backMenu").animate({ left: "-700px" }, 500)
  $(".arrow").animate({ bottom: "-300px" })
  $("#ReadmeCounter").animate({ bottom: "-300px" })
  $("#backMenu").prop("disabled", true);
  var mainText = document.getElementById("main");
  mainText!.style.display = "grid"
  var textReadMe = document.getElementById("readmeText");
  textReadMe!.style.display = "none"
  createBackGroundCube()
  document.body.scrollTop = document.documentElement.scrollTop = FormerScroll
  stopRotate()
}



//ONCLICK switch readme event
var indexReadme = 0;
import allReadmes from "./ListReadme.json" assert {type: "json"}

$("#ReadmeCounter").text(indexReadme + " / " + (allReadmes.length - 1))


var ALeft = document.getElementById("ALeft")
var ARight = document.getElementById("ARight")

ARight?.addEventListener("click", nextReadme)

var maxRD = 0;

function nextReadme() {
  if (indexReadme == allReadmes.length - 2) {
    $(".right").css({ "opacity": "0.5" })
  } else if (indexReadme == allReadmes.length-1) {
    return
  }
  indexReadme++;
  if (indexReadme >= 1) $(".left").css({ "opacity": "1" })
  $("#ReadmeCounter").text(indexReadme + " / " + (allReadmes.length-1))
  $("#readmeText").load("./Readmes/" + allReadmes[indexReadme])

  if(indexReadme>maxRD){
    createTab(indexReadme*2,8)
    maxRD = indexReadme
  }

}

ALeft?.addEventListener("click", previousReadme)

function previousReadme() {
  if (indexReadme == 1) {
    $(".left").css({ "opacity": "0.5" })
  } else if (indexReadme <= 0) {
    return
  }
  indexReadme--
  $(".right").css({ "opacity": "1" })
  $("#ReadmeCounter").text(indexReadme + " / " + (allReadmes.length-1))
  $("#readmeText").load("./Readmes/" + allReadmes[indexReadme])
}