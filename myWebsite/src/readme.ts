import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const canvaselem = document.getElementById("rd")!

const camera = new THREE.PerspectiveCamera(75, canvaselem.offsetWidth / canvaselem.offsetHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#rd")!,
});

renderer.setSize(canvaselem.offsetWidth, canvaselem.offsetHeight)

//square
const geometry = new THREE.BoxGeometry(10, 5, 10)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

//pointlight
const pointlight = new THREE.AmbientLight(0xffffff)
scene.add(pointlight)

camera.position.setZ(-30)

//background
const spaceTexture = new THREE.Color(0x000414)
scene.background = spaceTexture 

//gridHelper
const gridHelper = new THREE.GridHelper(200,50)
scene.add(gridHelper)

//orbitcontrol
const controls = new OrbitControls(camera,renderer.domElement)


function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera)

}
animate();
