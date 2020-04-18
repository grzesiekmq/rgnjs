import {
    MeshBasicMaterial
} from "../lib/three.module.js";
import {
    addBox,
    addPlane,
    addCone,
    addCylinder
} from '../editor/Shapes.js';
import {
    scene,
    loadFinishLine,
    saveString
} from "../app.js";
import {
    addGuiTransform,
    addGuiCamera,
    addGuiCarParams
} from '../editor/GuiManager.js';

import {
    GLTFExporter
} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/exporters/GLTFExporter.js';

import {
    guiTransform,
    guiCamera,
    guiCarParams
} from '../app.js'


export function clickActions() {
    const $entity = $('#entity');
    const $camera = $('.camera');
    const $car = $('#car');
    const $addBox = $('#addBox');
    const $addPlane = $('#addPlane');
    const $addCone = $('#addCone');
    const $addCylinder = $('#addCylinder');
    const $addFinishLine = $('#addFinishLine');

    const material = new MeshBasicMaterial();



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
    $camera.one('click', () => addGuiCamera(guiCamera));

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
    $addBox.click(() => {
        addBox(material)
        console.log(scene)
    });

    $addPlane.one('click', () => {

        const plane = document.createElement('p');
        plane.textContent = 'plane';
        $('.hierarchy').append(plane);

    })
    $addPlane.click(() => addPlane(material))

    $addCone.one('click', () => {

        const cone = document.createElement('p');
        cone.textContent = 'cone';
        $('.hierarchy').append(cone);

    })
    $addCone.click(() => addCone(material))

    $addCylinder.one('click', () => {

        const cylinder = document.createElement('p');
        cylinder.textContent = 'cylinder';
        $('.hierarchy').append(cylinder);

    })

    $addCylinder.click(() => {
        addCylinder('', material)

    });

    $addFinishLine.one('click', () => {
        loadFinishLine()
    })

    $('#exportGltf').click(() => {
        const exporter = new GLTFExporter();

        function onExport(gltf) {
            console.log(gltf);
            const output = JSON.stringify(gltf, null, 2);

            saveString(output, 'scene.gltf');
        }
        exporter.parse(scene, onExport);
    })


}