export class Suspension
    {
        distance = 0.0;
        spring = new Spring();

         springRate( mass,  distance, noOfWheels = 4)
        {
            return Math.round(mass / noOfWheels * 2 * 9.81 / distance);
        }

        compressionDistance(weight, gravity, springRate)
        {
            return Math.round(weight * gravity / springRate);
        }

         force( springRate,  compressionDistance,  damper,  contactSpeed)
        {
            return Math.round(springRate * compressionDistance + damper * contactSpeed);
        }
    }

    class Spring
    {
        springForce = 0;
        damper = 0;
        targetPos = .5;
    }
