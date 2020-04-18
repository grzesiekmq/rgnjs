import {
    Vector3,
    TubeBufferGeometry,
    MeshBasicMaterial,
    Mesh
} from '../lib/three.module.js';


import {
    scene,
    pi
} from '../app.js';

/**
 * 
 * @param  x1 x coord of 1st point
 * @param  x2 x coord of 2nd point
 * @param  x3 x coord of 3rd point
 * @param  adder the gap between y of 1st, 2nd, 3rd point
 * (the same with z) example adder=10 so 0,10,20 (if y1 is 0)
 * @param  y y coord of point
 * @param  z z coord of point
 * 
 * @returns array of 3 points (line) 
 */
function addTurn(x1, x2, x3, adder, y, z = y) {
    const line = [new Vector3(x1, y, z),
        new Vector3(x2, y += adder, z += adder),
        new Vector3(x3, y += adder, z += adder)
    ]
    return line;
}

/**
 * @param name name of track
 * @param  curve track path
 * @param  segments  https://threejs.org/docs/#api/en/geometries/TubeBufferGeometry
 * @param  radius  https://threejs.org/docs/#api/en/geometries/TubeBufferGeometry
 */
function createTrack(name, curve, segments, radius) {

    const tubeGeometry = new TubeBufferGeometry(curve, segments, 2, radius, false);

    const mat = new MeshBasicMaterial({
        color: 0x333333
    });
    const curveObject = new Mesh(tubeGeometry, mat);
    curveObject.name = name;
    scene.add(curveObject);

    curveObject.rotation.x = pi / 4
}

export {
    addTurn,
    createTrack
}