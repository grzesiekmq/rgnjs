import {
    Car
} from './Car.js';
import {
    Maths
} from './Maths.js';
import {
    Suspension
} from './CarParts/Suspension.js';
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
    displayCarDetails
} from './editor/CarDetails.js';
import {
    generateCarData
} from './editor/CarData.js';
import {
    calculateSpringRate,
    calculateSteering
} from './editor/ParamsCalculator.js';

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
    }

    createCamera() {
        this.fov = 40;
        this.near = .1;
        this.far = 1000;
        this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, this.near, this.far);
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

            loader.load(gltf, function (gltf) {

                model = gltf.scene;
                console.log(model.position);

                app.scene.add(model);

            }, undefined, function (error) {

                console.error(error);

            });

        }
        loadGltf();
    }
    gltfInput.addEventListener("change", handleFiles, false);
}
uploadGltf();

const car = new Car();

function display() {
    displayEntity(model);
    displayCarDetails();

}

function calculate() {
    calculateSteering();
    calculateSpringRate();
}
display();

generateCarData();

addCameraNameTpl(app.camera);

calculate();