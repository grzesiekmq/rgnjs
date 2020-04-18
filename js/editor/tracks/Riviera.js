import {
    Vector3,
    CatmullRomCurve3
} from "../../lib/three.module.js";


const pi = Math.PI

// riviera points
let point4 = new Vector3(-pi, 30, 30);
let point5 = new Vector3(-6 * pi, 40, 40);
let point6 = new Vector3(-pi, 140, 140);
let point7 = new Vector3(-5 * pi, 150, 150);
let point8 = new Vector3(pi, 170, 170);
let point9 = new Vector3(-2 * pi, 180, 180);
let point10 = new Vector3(2 * pi, 200, 200);
let point11 = new Vector3(-10 * pi, 210, 210);
let point12 = new Vector3(3 * pi, 220, 220);
let point13 = new Vector3(4 * pi, 250, 250);
let point14 = new Vector3(.5 * pi, 300, 300);
let point15 = new Vector3(-2 * pi, 310, 310);
let point16 = new Vector3(10 * pi, 320, 320);
let point17 = new Vector3(-5 * pi, 330, 330);
let point18 = new Vector3(5 * pi, 400, 400);
let point19 = new Vector3(10 * pi, 500, 500);
let point20 = new Vector3(50 * pi, 550, 550);

const rivieraTrack = new CatmullRomCurve3([
    point4, point5, point6, point7, point8, point9, point10,
    point11, point12, point13, point14, point15, point16, point17, point18, point19, point20

]);

rivieraTrack.curveType = 'catmullrom';
rivieraTrack.closed = true;


export {
    rivieraTrack
}