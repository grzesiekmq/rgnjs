import {
    addTurn
} from "./TrackCreator.js";


const pi = Math.PI


const trackParts = {
    leftpart1: pi / 2,
    leftpart2: pi,
    leftpart3: pi * 2,
    leftpart4: pi * 4,
    leftpart5: pi * 8,
    leftpart6: pi * 16,

    rightpart1: -pi,
    rightpart2: -pi * 2,
    rightpart3: -pi * 4,
    rightpart4: -pi * 6,
    rightpart5: -pi * 8,
    rightpart6: -pi * 16
};

export const {
    leftpart1,
    leftpart2,
    leftpart3,
    leftpart4,
    leftpart5,
    leftpart6,
    rightpart1,
    rightpart2,
    rightpart3,
    rightpart4,
    rightpart5,
    rightpart6
} = trackParts;

let y1 = 0;

let y2 = 0;

const adder = 5;
// slight right
const rightSlight =
    addTurn(rightpart1, rightpart2, rightpart3, adder, y1)
// sharp right
const rightSharp =
    addTurn(rightpart4, rightpart5, rightpart6, adder, y2)
// slight left
const leftSlight =
    addTurn(leftpart1, leftpart2, leftpart3, adder, y1)
// sharp left
const leftSharp =
    addTurn(leftpart4, leftpart5, leftpart6, adder, y2)

console.table(leftSlight)
console.table(leftSharp);

const turns = {
    rightTurnSlight: rightSlight,
    rightTurnSharp: rightSharp,
    leftTurnSlight: leftSlight,
    leftTurnSharp: leftSharp

};

const {
    rightTurnSlight,
    rightTurnSharp,
    leftTurnSlight,
    leftTurnSharp
} = turns;



export {
    rightTurnSlight,
    rightTurnSharp,
    leftTurnSlight,
    leftTurnSharp
}