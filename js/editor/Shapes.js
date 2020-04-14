import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';

function addBox(app, material) {
    const boxGeo = new THREE.BoxGeometry();
    const box = new THREE.Mesh(boxGeo, material);
    app.scene.add(box);
}

function addPlane(app, material) {
    const planeGeo = new THREE.PlaneGeometry();
    const plane = new THREE.Mesh(planeGeo, material);
    app.scene.add(plane);
    plane.rotation.x = Math.PI / 2;
}

function addCone(app, material) {
    const coneGeo = new THREE.ConeGeometry();
    const cone = new THREE.Mesh(coneGeo, material);
    app.scene.add(cone);

}

function addTube(app, material) {
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