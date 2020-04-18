import {
    BoxGeometry,
    Mesh,
    PlaneGeometry,
    ConeGeometry,
    CylinderGeometry
} from '../lib/three.module.js';
import {
    scene,
    pi
} from '../app.js';

/**
 * 
 * @param  material https://threejs.org/docs/#api/en/materials/Material
 */
function addBox(material) {
    const boxGeo = new BoxGeometry();
    const box = new Mesh(boxGeo, material);
    scene.add(box);
    return box;
}

/**
 * 
 * @param  material https://threejs.org/docs/#api/en/materials/Material
 */
function addPlane(material) {
    const planeGeo = new PlaneGeometry();
    const plane = new Mesh(planeGeo, material);
    scene.add(plane);
    plane.rotation.x = pi / 2;
    return plane;
}
/**
 * 
 * @param  material https://threejs.org/docs/#api/en/materials/Material
 */
function addCone(material) {
    const coneGeo = new ConeGeometry();
    const cone = new Mesh(coneGeo, material);
    scene.add(cone);
    return cone;
}
/**
 * 
 * @param  material https://threejs.org/docs/#api/en/materials/Material
 */
function addCylinder(name, material) {
    const cylinderGeo = new CylinderGeometry();
    const mesh = new Mesh(cylinderGeo, material);
    mesh.name = name;
    scene.add(mesh);
    return mesh;
}

export {
    addBox,
    addPlane,
    addCone,
    addCylinder
}