import {
    Car
} from './lib/rgn/Car.js';
import {
    Maths
} from './lib/rgn/Maths.js';
import {
    Suspension
} from './lib/rgn/CarParts/Suspension.js';
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

        var size = 100;
        var divisions = 10;

        var gridHelper = new THREE.GridHelper(size, divisions, 'green', 'green');

        this.scene.add(gridHelper);

    }

    createCamera() {
        this.fov = 40;
        this.aspect = window.innerWidth / window.innerHeight;
        this.near = .1;
        this.far = 1000;
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

let app = new App();

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

const car = new Car();

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

$entity.click(function() {
    guiTransform.show();
    guiCamera.hide();
    guiCarParams.hide();

});
$entity.one('click', function() {
    addGuiTransform(guiTransform, model);
});

$camera.click(function() {
    guiCamera.show();
    guiCarParams.hide();
    guiTransform.hide();

});
$camera.one('click', function() {
    addGuiCamera(app, guiCamera);
});

$car.click(function() {

    guiCarParams.show();
    guiTransform.hide();
    guiCamera.hide();

});
$car.one('click', function() {
    addGuiCarParams(guiCarParams);

});

$addBox.one('click', function() {

    const box = document.createElement('p');
    box.textContent = 'box';
    $('.hierarchy').append(box);
})
$addBox.click(function() {
    addBox(app, material);

});

$addPlane.one('click', function() {

    addPlane(app, material);
    const plane = document.createElement('p');
    plane.textContent = 'plane';
    $('.hierarchy').append(plane);

})
$addCone.one('click', function() {

    addCone(app, material);
    const cone = document.createElement('p');
    cone.textContent = 'cone';
    $('.hierarchy').append(cone);

})
$addTube.one('click', function() {

    addTube(app, material);
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
$('#exportGltf').click(function() {
    const exporter = new GLTFExporter();

    exporter.parse(app.scene, function(gltf) {
        console.log(gltf);
        const output = JSON.stringify(gltf, null, 2);

        saveString(output, 'scene.gltf');
    });
});

console.log(app.scene);

export {
    guiCarParams
}