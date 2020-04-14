import {
    Differential
} from './CarParts/Differential.js';
import {
    Clutch
} from './CarParts/Clutch.js';
import {
    Gearbox
} from './CarParts/Gearbox.js';
import {
    Suspension
} from './CarParts/Suspension.js';

import {
    Maths
} from './Maths.js';

export class Car {

    differential = new Differential();
    clutch = new Clutch();
    gearbox = new Gearbox();
    suspension = new Suspension();

    distance = 0;
    speed = 0;
    topSpeed = 0;
    handling = 0;
    make = "";
    model = "";
    color = "";
    description = "";
    hp = 0;
    weight = 0;
    wheelBase = 0.0;
    rearTrack = 0.0;
    turnRadius = 0.0;
    wheelRadius = 0.0;
    RPM = 0;
    isLocked = true;
    isWon = false;
    isUsed = false;
    AImode = false;
    fuelConsumption = 0.0;
    tireExploit = 0.0;

    // car related types
    driveType = {
        Awd: 1,
        Fwd: 2,
        Rwd: 3
    };

    transmissionType = {
        MT: 1,
        AT: 2

    };

    carType = {
        Sports: 1,
        Racecar: 2,
        Supercar: 3,
        Drift: 4,
        Drag: 5,
        Rally: 6,
        Concept: 7,
        Hypercar: 8,
        Tuned: 9
    };

    racingType = {
        GTR: 1,
        F1: 2,
        Touring: 3
    };

    tireType = {
        Sport: 1,
        SemiSlick: 2,
        Slick: 3,
        Supersoft: 4,
        Soft: 5,
        Medium: 6,
        Hard: 7,
        Dry: 8,
        Wet: 9,
        Street: 10,
        Rally: 11,
        Dirt: 12,
        Snow: 13,
        Summer: 14
    };

    paint = {
        Matte: 1,
        Chrome: 2,
        Metallic: 3,
        Pearl: 4,
        Solid: 5
    };

    safetySystems = {
        ABS: 1,
        ESP: 2,
        TCS: 3,
        ESC: 4,
        ASR: 5
    };

    price = {
        Usd: 1,
        Eur: 2
    };

    wheels = {
        // front
        FR: 1,

        FL: 2,

        // rear
        RL: 3,

        RR: 4
    };

    wheelColliders = {
        // front
        ColFR: 1,

        ColFL: 2,

        // rear
        ColRL: 3,

        ColRR: 4
    }

    constructor() {

    }

    /**
     @summary left angle of ackermann steering in degrees
     params in metres
     @param  rearTrack
     @param wheelBase
    @param turnRadius
    
    @returns angle
   */
    static ackermannLeft(rearTrack, wheelBase, turnRadius) {
        let left = Math.atan(wheelBase / (turnRadius + rearTrack / 2));
        return Maths.radToDeg(left);
    }

    /**
    @summary right angle of ackermann steering in degrees
    
    @param rearTrack
    @param wheelBase
    @param turnRadius
     @returns angle
    */
    static ackermannRight(rearTrack, wheelBase, turnRadius) {
        let right = Math.atan(wheelBase / (turnRadius - rearTrack / 2));
        return Maths.radToDeg(right);
    }

    /**  @summary Meters per second to kmh.
    
     @param speed
    @returns speed in kmh
    */
    static mpsToKmh(speed) {
        return Math.round(speed * 3.6);
    }

    /**  @summary Meters to km.
    
    @param distance
    @returns The km.
    */
    static mToKm(distance) {
        return distance / 1000;
    }

    /**  @summary    Kmh to mph
    
     @param speed
    @returns speed in mph
    */
    static kmhToMph(speed) {
        return Math.round(speed / 1.61);
    }

    /**  @summary Mph to kmh
    
     @param speed
    @returns speed in kmh
    */
    static mphToKmh(speed) {
        return Math.round(speed * 1.61);
    }

    accelerate(engineForce) {
        //  rb.AddForce(engineForce);
    }

    brake(brakeForce) {
        //   rb.AddForce(brakeForce);
    }

    steerLeft(torque) {
        //   rb.AddTorque(torque * -1);
    }

    steerRight(torque) {
        //   rb.AddTorque(torque);
    }

}