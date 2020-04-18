import {
    Vector3,
    Scene,
    WebGLRenderer,
    GridHelper,
    PerspectiveCamera,
    HemisphereLight,
    MeshBasicMaterial,
    BoxGeometry,
    PlaneGeometry,
    CylinderGeometry
} from './lib/three.module.js';
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
    calculateSpringRate,
    calculateSteering
} from './editor/ParamsCalculator.js';


import {
    createTrack
} from './editor/TrackCreator.js';
import {
    clickActions
} from './editor/ClickHandler.js';
import {
    setCarColor,
    colorGUI
} from './editor/CarColor.js';
import {
    rivieraTrack
} from './editor/tracks/Riviera.js';
import {
    hardTrack
} from './editor/tracks/HardTrack.js';

class App {

    constructor() {
        this.createScene();

    }

    createScene() {
        this.scene = new Scene();

        this.createCamera();

        this.createLight();

        this.renderer = new WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.update();

        this.render();

        const size = 100;
        const divisions = 10;

        this.gridHelper = new GridHelper(size, divisions, 'green', 'green');
        this.gridHelper.visible = false;

        this.scene.add(this.gridHelper);

    }

    createCamera() {
        this.fov = 40;
        this.aspect = window.innerWidth / window.innerHeight;
        this.near = .1;
        this.far = 10000;
        this.camera = new PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        this.camera.position.z = 5;
        this.camera.name = 'camera';

    }

    createLight() {
        this.intensity = 1;
        this.light = new HemisphereLight(0xffffbb, 0x080820, this.intensity);
        this.scene.add(this.light);

    }

    render() {
        requestAnimationFrame(() => {
            this.render();
        });
        this.renderer.render(this.scene, this.camera);
    }

}

let app = new App();

const {
    scene,
    camera,
    gridHelper
} = app

let model;

const gltfInput = document.querySelector("#gltfUpload");

const notifier = new AWN();

const loader = new GLTFLoader();

function uploadGltf() {

    function handleFiles() {
        const fileList = this.files;
        const gltf = fileList[0].name;

        const entity = document.querySelector('#entity');
        entity.textContent = gltf;

        function loadGltf() {

            function onLoad(gltf) {

                model = gltf.scene.children[0];
                console.log(model.position);

                scene.add(model);

                notifier.success('model loaded');

                colorGUI.show()

            }

            function onError(error) {

                console.error(error);

            }
            loader.load(`assets/${gltf}`, onLoad, undefined, onError);

        }
        loadGltf();

    }
    gltfInput.addEventListener("change", handleFiles, false);
}

uploadGltf();
setCarColor();

function loadFinishLine() {

    function loadGltf() {

        function onLoad(gltf) {

            model = gltf.scene.children[0];

            scene.add(model);

            notifier.success('finish line added');

        }

        function onError(error) {

            console.error(error);

        }
        loader.load(`assets/finish-line.gltf`, onLoad, undefined, onError);

    }

    loadGltf();

}

function display() {
    displayEntity(model);

}

function calculate() {
    calculateSteering();
    calculateSpringRate();
}
display();

addCameraNameTpl(camera);

calculate();

const guiTransform = new dat.GUI();
const guiCamera = new dat.GUI();
const guiCarParams = new dat.GUI();
const guiTracks = new dat.GUI();



const guiArr = [guiTransform, guiCamera, guiCarParams, guiTracks];

guiArr.map(gui => gui.hide());

const pi = Math.PI;

clickActions();

console.log(scene)

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

const tracksNames = ['riviera', 'hardtrack']
const track = {
    name: ''
}
let trackSelect = guiTracks.add(track, 'name', tracksNames).name('track name').listen();
$('#addTrack').click(() => guiTracks.show())

trackSelect.onChange((value) => {
    if (value === 'riviera') {
        if (scene.getObjectByName('hardTrack') !== undefined) {
            scene.remove(scene.getObjectByName('hardTrack'));
        }
        createTrack('riviera', rivieraTrack)

        console.log(scene)
    } else if (value === 'hardtrack') {

        if (scene.getObjectByName('riviera') !== undefined) {

            scene.remove(scene.getObjectByName('riviera'));
        }
        createTrack('hardTrack', hardTrack, 1000, 2);
    }

})

function toggleGrid() {
    if ($(this).is(':checked')) {

        gridHelper.visible = true
    } else {

        gridHelper.visible = false
    }
}

$('#customSwitch').click(toggleGrid)

camera.position.z = 10;
camera.position.y = 2;

console.log(scene);

export {
    guiCarParams,
    app,
    notifier,
    camera,
    scene,
    pi,
    loadFinishLine,
    saveString,

    guiTransform,
    guiCamera,
    guiTracks
}