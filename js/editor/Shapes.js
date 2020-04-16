import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import {
    app
} from '../app.js';

function addBox(material) {
    const boxGeo = new THREE.BoxGeometry();
    const box = new THREE.Mesh(boxGeo, material);
    app.scene.add(box);
    return box;
}

function addPlane(material) {
    const planeGeo = new THREE.PlaneGeometry();
    const plane = new THREE.Mesh(planeGeo, material);
    app.scene.add(plane);
    plane.rotation.x = Math.PI / 2;
}

function addCone(material) {
    const coneGeo = new THREE.ConeGeometry();
    const cone = new THREE.Mesh(coneGeo, material);
    app.scene.add(cone);

}

function addTube(material) {
    const tubeGeo = new THREE.CylinderGeometry();
    const tube = new THREE.Mesh(tubeGeo, material);
    app.scene.add(tube);
}

export {
    addBox,
    addPlane,
    addCone,
    addTube
}