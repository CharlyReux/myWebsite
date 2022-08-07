import './style.css'



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
}



//ONCLICK switch readme event
var indexReadme = 0;
import allReadmes from "./ListReadme.json" assert {type: "json"}

$("#ReadmeCounter").text(indexReadme + " / " + allReadmes.length)


var ALeft = document.getElementById("ALeft")
var ARight = document.getElementById("ARight")

ARight?.addEventListener("click", nextReadme)

function nextReadme() {
  if (indexReadme == allReadmes.length -1) {
    $(".right").css({ "opacity": "0.5" })
  }else   if (indexReadme == allReadmes.length) {
    return
  }
  if (indexReadme >= 1) $(".left").css({ "opacity": "1" })
  indexReadme++;
  $("#ReadmeCounter").text(indexReadme + " / " + allReadmes.length)
  $("#readmeText").load("./Readmes/" + allReadmes[indexReadme - 1])
}

ALeft?.addEventListener("click", previousReadme)

function previousReadme() {
  if (indexReadme <= 1) {
    return;
  } else  if (indexReadme <= 2) {
    $(".left").css({ "opacity": "0.5" })
  } 
  indexReadme--
  $(".right").css({ "opacity": "1" })
  $("#ReadmeCounter").text(indexReadme + " / " + allReadmes.length)
  $("#readmeText").load("./Readmes/" + allReadmes[indexReadme - 1])
}