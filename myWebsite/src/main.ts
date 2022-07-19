import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene();
{
  const color = 0x000414;
  const density = 0.004;
  scene.fog = new THREE.FogExp2(color, density)
}

//background
const spaceTexture = new THREE.Color(0x000414)
scene.background = spaceTexture 

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector("#bg")!,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight)

camera.position.setZ(30)

//square
const geometry = new THREE.BoxGeometry(10,5,10)
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} );
const cube = new THREE.Mesh( geometry, material );

cube.position.setY(-5000)
scene.add( cube );

//pointlight
const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set(0,0,30)
pointlight.power = 6
scene.add(pointlight)

 //ambientlight
/* const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight) */
 
//lighthelper
/* const lighthelper = new THREE.PointLightHelper(pointlight)
scene.add(lighthelper)

//gridHelper
const gridHelper = new THREE.GridHelper(200,50)
scene.add(gridHelper)

//orbitcontrol
const controls = new OrbitControls(camera,renderer.domElement)
 */

//on scroll animation
var currentscroll = 0;
document.body.onscroll = moveCamera
function moveCamera(){
  const t= document.body.getBoundingClientRect().top
  const scrolled = currentscroll-t;
  squareArray.forEach(square=>{
    square.position.z+=0.01*scrolled
  })
  currentscroll = t;
}




function addSquare(){
  const randCubeGeometry = new THREE.BoxGeometry(8,40,8)
  const material = new THREE.MeshStandardMaterial( {color: 0x9e9e9e} );
  const randCube = new THREE.Mesh( randCubeGeometry, material );
  
  const [x,y] = Array(3).fill(3).map(()=>THREE.MathUtils.randFloatSpread(600));

  const z = THREE.MathUtils.randFloat(0,-400)

  randCube.position.set(x,y,z)
  scene.add(randCube)
  return randCube
}
const squareArray:THREE.Mesh[] = []
for (let i = 0; i < 300; i++) {
  squareArray[i] = addSquare()
}




function animate(){
  requestAnimationFrame(animate);

  //main cube animation
  cube.rotation.x+=0.01
  cube.rotation.y+=0.005
  cube.rotation.z+=0.01

  //all subCubes animation
  squareArray.forEach(square=>{
    square.position.y+=0.3
    square.position.z+=0.15
    if(square.position.y>300){
      square.position.y = -300
    }
    if(square.position.z>50){
      square.position.z = -400
    }
    })



  //controls.update

  renderer.render(scene,camera)
}

animate()