import {
    addTurn
} from "../TrackCreator.js";

import {
    leftpart1,
    leftpart2,
    leftpart3,
    leftpart4,
    leftpart5,
    leftpart6
} from '../Turns.js'

import {
    CatmullRomCurve3
} from '../../lib/three.module.js'

const adder = 5;


const turnsArr = [

    addTurn(leftpart1, leftpart2, leftpart3, adder, 220),
    addTurn(leftpart1, leftpart2, leftpart3, adder, 250),
    addTurn(leftpart1, leftpart2, leftpart3, adder, 300),
    addTurn(leftpart1, leftpart2, leftpart3, adder, 500),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 600),
    addTurn(leftpart1, leftpart2, leftpart3, adder, 700),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 900),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 1000),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 1200),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 1500),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 2000),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 2500),
    addTurn(leftpart4, leftpart5, leftpart6, adder, 2600),

    addTurn(100, 150, 200, 50, 4200),
    addTurn(250, 300, 400, 50, 4500),
    addTurn(500, 600, 800, 50, 5000),
    addTurn(900, 1000, 1200, 50, 5500),
    addTurn(1500, 1600, 1800, 50, 6000),

]

const hardTrack = new CatmullRomCurve3(turnsArr.flat());

hardTrack.closed = true;

export {
    hardTrack
}