import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import {
    GLTFLoader
} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';
import {
    OrbitControls
} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
import {
    addCameraNameTpl
} from './editor/Template.js';
import {
    displayEntity
} from './editor/EntityTransform.js';
import {
    generateCarData
} from './editor/GuiManager.js';

import {
    calculateSpringRate,
    calculateSteering
} from './editor/ParamsCalculator.js';

import {
    Transform
} from './editor/Transform.js';

import {
    addGuiTransform,
    addGuiCamera,
    addGuiCarParams
} from './editor/GuiManager.js';
import {
    addBox,
    addPlane,
    addCone,
    addTube
} from './editor/Shapes.js';

import {
    exportToJsonFile
} from './editor/GuiManager.js';

import {
    GLTFExporter
} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/exporters/GLTFExporter.js';

import {
    addTurn,
    createTrack
} from './editor/TrackCreator.js';

class App {

    constructor() {
        this.createScene();

    }

    createScene() {
        this.scene = new THREE.Scene();

        this.createCamera();

        this.createLight();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.update();

        this.render();

        const size = 100;
        const divisions = 10;

        this.gridHelper = new THREE.GridHelper(size, divisions, 'green', 'green');
        this.gridHelper.visible = false;

        this.scene.add(this.gridHelper);

    }

    createCamera() {
        this.fov = 40;
        this.aspect = window.innerWidth / window.innerHeight;
        this.near = .1;
        this.far = 10000;
        this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        this.camera.position.z = 5;
        this.camera.name = 'camera';

    }

    createLight() {
        this.intensity = 1;
        this.light = new THREE.HemisphereLight(0xffffbb, 0x080820, this.intensity);
        this.scene.add(this.light);

    }

    render() {
        requestAnimationFrame(() => {
            this.render();
        });
        this.renderer.render(this.scene, this.camera);
    }

}

export let app = new App();

let model;

const gltfInput = document.querySelector("#gltfUpload");

function uploadGltf() {

    function handleFiles() {
        const fileList = this.files;
        const gltf = fileList[0].name;

        const entity = document.querySelector('#entity');
        entity.textContent = gltf;

        function loadGltf() {

            const loader = new GLTFLoader();

            function onLoad(gltf) {

                model = gltf.scene;
                console.log(model.position);

                app.scene.add(model);

            }

            function onError(error) {

                console.error(error);

            }
            loader.load(gltf, onLoad, undefined, onError);

        }
        loadGltf();
    }
    gltfInput.addEventListener("change", handleFiles, false);
}
uploadGltf();

function display() {
    displayEntity(model);

}

function calculate() {
    calculateSteering();
    calculateSpringRate();
}
display();

addCameraNameTpl(app.camera);

calculate();

const guiTransform = new dat.GUI();
const guiCamera = new dat.GUI();
const guiCarParams = new dat.GUI();

const guiArr = [guiTransform, guiCamera, guiCarParams];

guiArr.map(gui => gui.hide());

const material = new THREE.MeshBasicMaterial();

const $entity = $('#entity');
const $camera = $('.camera');
const $car = $('#car');
const $addBox = $('#addBox');
const $addPlane = $('#addPlane');
const $addCone = $('#addCone');
const $addTube = $('#addTube');

$entity.click(() => {
    guiTransform.show();
    guiCamera.hide();
    guiCarParams.hide();

});
$entity.one('click', () => addGuiTransform(guiTransform, model));

$camera.click(() => {
    guiCamera.show();
    guiCarParams.hide();
    guiTransform.hide();

});
$camera.one('click', () => addGuiCamera(app, guiCamera));

$car.click(() => {

    guiCarParams.show();
    guiTransform.hide();
    guiCamera.hide();

});
$car.one('click', () => addGuiCarParams(guiCarParams)

);

$addBox.one('click', () => {

    const box = document.createElement('p');
    box.textContent = 'box';
    $('.hierarchy').append(box);
})
$addBox.click(() => addBox(material)

);

$addPlane.one('click', () => {

    addPlane(material);
    const plane = document.createElement('p');
    plane.textContent = 'plane';
    $('.hierarchy').append(plane);

})
$addCone.one('click', () => {

    addCone(material);
    const cone = document.createElement('p');
    cone.textContent = 'cone';
    $('.hierarchy').append(cone);

})
$addTube.one('click', () => {

    addTube(material);
    const cylinder = document.createElement('p');
    cylinder.textContent = 'cylinder';
    $('.hierarchy').append(cylinder);

})
const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link);

function save(blob, filename) {

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

}

function saveString(text, filename) {

    save(new Blob([text], {
        type: 'text/plain'
    }), filename);

}
$('#exportGltf').click(() => {
    const exporter = new GLTFExporter();

    exporter.parse(app.scene, function (gltf) {
        console.log(gltf);
        const output = JSON.stringify(gltf, null, 2);

        saveString(output, 'scene.gltf');
    });
});

const pi = Math.PI;
// riviera points
let point4 = new THREE.Vector3(-pi, 30, 30);
let point5 = new THREE.Vector3(-6 * pi, 40, 40);
let point6 = new THREE.Vector3(-pi, 140, 140);
let point7 = new THREE.Vector3(-5 * pi, 150, 150);
let point8 = new THREE.Vector3(pi, 170, 170);
let point9 = new THREE.Vector3(-2 * pi, 180, 180);
let point10 = new THREE.Vector3(2 * pi, 200, 200);
let point11 = new THREE.Vector3(-10 * pi, 210, 210);
let point12 = new THREE.Vector3(3 * pi, 220, 220);
let point13 = new THREE.Vector3(4 * pi, 250, 250);
let point14 = new THREE.Vector3(.5 * pi, 300, 300);
let point15 = new THREE.Vector3(-2 * pi, 310, 310);
let point16 = new THREE.Vector3(10 * pi, 320, 320);
let point17 = new THREE.Vector3(-5 * pi, 330, 330);
let point18 = new THREE.Vector3(5 * pi, 400, 400);
let point19 = new THREE.Vector3(10 * pi, 500, 500);
let point20 = new THREE.Vector3(50 * pi, 550, 550);

const rivieraTrack = new THREE.CatmullRomCurve3([
    point4, point5, point6, point7, point8, point9, point10,
    point11, point12, point13, point14, point15, point16, point17, point18, point19, point20

]);

rivieraTrack.curveType = 'catmullrom';
rivieraTrack.closed = true;

console.log(rivieraTrack.points)
const mat = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});

const boxGeo = new THREE.BoxGeometry();

const trackParts = {
    leftpart1: pi / 2,
    leftpart2: pi,
    leftpart3: pi * 2,
    leftpart4: pi * 4,
    leftpart5: pi * 8,
    leftpart6: pi * 16,

    rightpart1: -pi,
    rightpart2: -pi * 2,
    rightpart3: -pi * 4,
    rightpart4: -pi * 6,
    rightpart5: -pi * 8,
    rightpart6: -pi * 16
};

const {
    leftpart1,
    leftpart2,
    leftpart3,
    leftpart4,
    leftpart5,
    leftpart6,
    rightpart1,
    rightpart2,
    rightpart3,
    rightpart4,
    rightpart5,
    rightpart6
} = trackParts;

let y1 = 0;

let y2 = 0;

const adder = 5;
// slight right
const rightSlight =
    addTurn(rightpart1, rightpart2, rightpart3, adder, y1)
// sharp right
const rightSharp =
    addTurn(rightpart4, rightpart5, rightpart6, adder, y2)
// slight left
const leftSlight =
    addTurn(leftpart1, leftpart2, leftpart3, adder, y1)
// sharp left
const leftSharp =
    addTurn(leftpart4, leftpart5, leftpart6, adder, y2)

console.table(leftSlight)
console.table(leftSharp);

const turns = {
    rightTurnSlight: rightSlight,
    rightTurnSharp: rightSharp,
    leftTurnSlight: leftSlight,
    leftTurnSharp: leftSharp

};

const {
    rightTurnSlight,
    rightTurnSharp,
    leftTurnSlight,
    leftTurnSharp
} = turns;

const turnsArr = [

    addTurn(leftpart1, leftpart2, leftpart3, adder, 220),
    addTurn(leftpart1, leftpart2, leftpart3, adder, 250),
    addTurn(leftpart1, leftpart2, leftpart3, adder, 300),
    addTurn(leftpart1, leftpart2, leftpart3, adder, 500),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 600),
    addTurn(leftpart1, leftpart2, leftpart3, adder, 700),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 900),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 1000),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 1200),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 1500),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 2000),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 2500),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 2600),

    addTurn(100, 150, 200, 50, 4200),
    addTurn(250, 300, 400, 50, 4500),
    addTurn(500, 600, 800, 50, 5000),
    addTurn(900, 1000, 1200, 50, 5500),
    addTurn(1500, 1600, 1800, 50, 6000),

]

const testTrack = new THREE.CatmullRomCurve3(turnsArr.flat());

testTrack.closed = true;

$('#addTrack').click(() => createTrack(rivieraTrack))

createTrack(testTrack, 1000, 2);

console.log(testTrack);

$('#customSwitch').click(function () {
    if ($(this).is(':checked')) {

        app.gridHelper.visible = true
    } else {

        app.gridHelper.visible = false
    }
})

app.camera.position.z = 300;
app.camera.position.y = 100;

console.log(app.scene);

export {
    guiCarParams
}