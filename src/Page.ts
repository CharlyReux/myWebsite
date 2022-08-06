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
var FormerScroll=0

///ONCLICK event
divRead.addEventListener("click", zoomIn)
$("#backMenu").prop("disabled", true);
function zoomIn() {
  FormerScroll = document.documentElement.scrollTop
  canvaselem.style.zIndex = "1"
  $("#backMenu").animate({ left: "5%" }, 500)
  $("#backMenu").prop("disabled", false);
  var textReadMe = document.getElementById("readmeText");
  textReadMe!.style.display="grid"
  var mainText = document.getElementById("main");
  mainText!.style.display="none"
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}


var backMenuButton = document.getElementById("backMenu")
backMenuButton?.addEventListener("click", goBackMenu)
function goBackMenu() {
  canvaselem.style.zIndex = "-1"
  $("#backMenu").animate({ left: "-700px" }, 500)
  $("#backMenu").prop("disabled", true);
  var mainText = document.getElementById("main");
  mainText!.style.display="grid"
  var textReadMe = document.getElementById("readmeText");
  textReadMe!.style.display="none"
  createBackGroundCube()
  document.body.scrollTop = document.documentElement.scrollTop = FormerScroll
}