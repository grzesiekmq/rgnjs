import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import {
    app
} from '../app.js';

function addTurn(part1, part2, part3, adder, y, z = y) {
    return [new THREE.Vector3(part1, y, z),
        new THREE.Vector3(part2, y += adder, z += adder),
        new THREE.Vector3(part3, y += adder, z += adder)
    ]
}

function createTrack(curve, segments, radius) {

    const tubeGeometry = new THREE.TubeBufferGeometry(curve, segments, 2, radius, false);

    const mat = new THREE.MeshBasicMaterial({
        color: 0x333333
    });
    const curveObject = new THREE.Mesh(tubeGeometry, mat);

    app.scene.add(curveObject);

    curveObject.rotation.x = Math.PI / 4
}

export {
    addTurn,
    createTrack
}