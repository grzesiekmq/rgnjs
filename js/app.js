import { Car } from './Car.js';
import { Maths } from './Maths.js';
import { Suspension } from './CarParts/Suspension.js';
import { Transform } from './editor/Transform.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.name = 'camera';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.name = "box";
scene.add(cube);

console.log(camera);

const entity = document.querySelector('#entity');

const car = new Car();

function loadTemplate(iframeId, id) {
    const iFrame = document.querySelector(iframeId);
    if (!iFrame || !iFrame.contentDocument) {
        console.log('missing iframe or iframe can not be retrieved ' + iframeId);
        return "";
    }

    const el = iFrame.contentDocument.querySelector(id);
    if (!el) {
        console.log('iframe element can not be located ' + id);
        return "";
    }

    return el;
}

function addCameraNameTpl() {

    const tpl = loadTemplate('#template-camera-name', '#camera-name');

    const template = $(tpl).html();

    // Compile the template data into a function
    const templateScript = Handlebars.compile(template);

    const context = { "name": camera.name };

    const html = templateScript(context);

    // Insert the HTML code into the page
    $('.hierarchy').append(html);
}

function addTransformTpl() {

    const tpl = loadTemplate('#template-transform', '#transform');

    const template = $(tpl).html();

    // Compile the template data into a function
    const templateScript = Handlebars.compile(template);

    const context = {};

    const html = templateScript(context);

    return html;

}

function addCarTpl() {

    const tpl = loadTemplate('#template-car-props', '#car-props');

    const template = $(tpl).html();

    // Compile the template data into a function
    const templateScript = Handlebars.compile(template);

    const { topSpeed,
        hp,
        weight,
        wheelBase,
        rearTrack,
        turnRadius,
        wheelRadius,
        rpm,
        fuelConsumption,
        tireExploit } = car;

    const context = {
        topSpeed,
        hp,
        weight,
        wheelBase,
        rearTrack,
        turnRadius,
        wheelRadius,
        rpm,
        fuelConsumption,
        tireExploit

    };

    const html = templateScript(context);

    return html;

}

entity.textContent = scene.getObjectByName('box').name;
function entityCallback() {

    console.log('c')

    const html = addTransformTpl();
    $('.transform').append(html);

    const posX = document.querySelector('#posX');
    const posY = document.querySelector('#posY');
    const posZ = document.querySelector('#posZ');

    const rotX = document.querySelector('#rotX');
    const rotY = document.querySelector('#rotY');
    const rotZ = document.querySelector('#rotZ');

    const scaleX = document.querySelector('#scaleX');
    const scaleY = document.querySelector('#scaleY');
    const scaleZ = document.querySelector('#scaleZ');

    function setPos() {
        Transform.setPosX(posX, cube);
        Transform.setPosY(posY, cube);
        Transform.setPosZ(posZ, cube);
    }

    function setRot() {

        Transform.setRotX(rotX, cube);
        Transform.setRotY(rotY, cube);
        Transform.setRotZ(rotZ, cube);
    }

    function setScale() {

        Transform.setScaleX(scaleX, cube);
        Transform.setScaleY(scaleY, cube);
        Transform.setScaleZ(scaleZ, cube);
    }
    setPos();
    setRot();
    setScale();
}
$('#entity').one('click', entityCallback);

$('#car').one('click', () => {

    const html = addCarTpl();
    $('.transform').append(html);

});

function generateObj(obj, arr, val) {
    if (arr.length === 1) {
        obj[arr[0]] = val;
        return;
    }
    if (!obj[arr[0]]) {
        obj[arr[0]] = {};
    }
    const restArr = arr.splice(1);
    generateObj(obj[arr[0]], restArr, val);
};

function getData(id) {
    const form = document.querySelector(id);
    const inputCollection = form.getElementsByTagName('input');
    const inputArray = [...inputCollection];
    const data = {};
    inputArray.map(input => {
        const { name, value } = input;
        const splitName = name.split('.');
        generateObj(data, splitName, value);
    })
    return data;
}

$(document.body).on('click', '#generate', function (e) {
    e.preventDefault();

    const data = getData('#json');
    console.log(JSON.stringify(data));
});

addCameraNameTpl();

camera.position.z = 5;

const suspension = new Suspension();
console.log('spring rate', suspension.springRate(1000, .5));

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();