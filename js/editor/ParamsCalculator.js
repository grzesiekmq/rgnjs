import {
    Car
} from '../lib/rgn/Car.js';
import {
    Suspension
} from '../lib/rgn/CarParts/Suspension.js';


function calculateSteering() {
    const wheelBase = document.querySelector('#wheelBase2');
    const rearTrack = document.querySelector('#rearTrack2');
    const turnRadius = document.querySelector('#turnRadius2');

    const resultSteering = document.querySelector('#result');


    $('#calculate').click(() => {

        let ackermann = Car.ackermannLeft(+wheelBase.value, +rearTrack.value, +turnRadius.value);
        if (isNaN(ackermann)) {
            return;
        } else {

            resultSteering.textContent = `${ackermann.toFixed(2)} degrees`;
        }
    });
}

function calculateSpringRate() {
    const resSpringRate = document.querySelector('#resSpringRate');

    const mass = document.querySelector('#mass');
    const distance = document.querySelector('#distance');


    $('#calcSpring').click(() => {
        let springRate = Suspension.springRate(+mass.value, +distance.value);
        if (isNaN(springRate)) {
            return;
        } else {
            resSpringRate.textContent = `${springRate} N/mm`;
        }
    });
}

export {
    calculateSteering,
    calculateSpringRate
}