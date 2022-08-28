import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Camera, Vector3 } from 'three';


///readme stuff




//treejs stuff
const scene = new THREE.Scene();


const canvaselem = <HTMLCanvasElement>document.getElementById("rd")!

const camera = new THREE.PerspectiveCamera(75, canvaselem.offsetWidth / canvaselem.offsetHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#rd")!,
    preserveDrawingBuffer: true
});

renderer.setSize(canvaselem.offsetWidth, canvaselem.offsetHeight)

//window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//pointlight
const pointlight = new THREE.PointLight(0xffffff)
pointlight.power = 100
pointlight.position.set(10, 10, 0)
scene.add(pointlight)


camera.position.set(20, 15, 15)
camera.lookAt(0, 0, 0)

//ambientlight

const ambientLight = new THREE.AmbientLight(0x1f1f1f)
scene.add(ambientLight)



//background
const spaceTexture = new THREE.Color(0x000000)
scene.background = spaceTexture

//gridHelper
/* const gridHelper = new THREE.GridHelper(200,50)
scene.add(gridHelper) */

//orbitcontrol
const controls = new OrbitControls(camera, renderer.domElement)

//cube creation
var cubeArray: THREE.Mesh[] = []
createTab(1, 10)

var WantedCamPosition: Vector3 = new Vector3(20, 15, 15)

import * as TWEEN from "@tweenjs/tween.js";


/**
 * Function that create a tri-dimensional array with equally distant coordinates around 0
 */
export function createTab(WIDTH: number, DIST: number) {
    //deleting the existing cubes

    cubeArray.forEach(element => {
        scene.remove(element)
    });

    const v = Math.floor(WIDTH / 2)
    var index = 0;
    var tabarray = [];
    for (var i = -v; i <= v; i++) {
        for (var j = -v; j <= v; j++) {
            for (var k = -v; k <= v; k++) {
                if (k == v || k == -v || j == v || j == -v || i == v || i == -v) {
                    var tab = [];
                    tab[0] = i * DIST
                    tab[1] = j * DIST
                    tab[2] = k * DIST
                    tabarray[index] = tab
                    index++;
                }
            }
        }
    }
    tabarray.forEach(co => {
        const nCube = new THREE.BoxGeometry(5, 5, 5)
        const material = new THREE.MeshStandardMaterial({ color: 0x9e9e9e })
        const Ccube = new THREE.Mesh(nCube, material)
        Ccube.position.set(co[0], co[1], co[2])
        cubeArray.push(Ccube)
        scene.add(Ccube)
    });

    var posX = 40 * (WIDTH / 10) + 16;
    var test: Vector3 = camera.position.clone()
    WantedCamPosition = test.normalize().multiplyScalar(new Vector3(posX, posX * (3 / 4), posX * (3 / 4)).length())
    var previousCamPos = camera.position
    new TWEEN.Tween(previousCamPos)
        .to(WantedCamPosition)
        .onUpdate(() =>
            camera.position.set(previousCamPos.x, previousCamPos.y, previousCamPos.z)
        )
        .start();

    pointlight.power =  WIDTH
}

controls.autoRotate = true
controls.autoRotateSpeed = 1

controls.enableZoom = false;
controls.enableRotate = false;
controls.enablePan = false;
export function stopRotate() {
    controls.autoRotate = false
}
export function startRotate() {
    controls.autoRotate = true
}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    TWEEN.update()
    controls.update()
}
animate();





