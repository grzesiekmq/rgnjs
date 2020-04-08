export class Maths
    {
        /**  @summary convert radians to degrees
        
        @param angle
        @returns converted angle
        */
         static  radToDeg( angle)
        {
            return angle * (180.0 / Math.PI);
        }

        /**  @summary Gets random item from array.
        
         @param array
        @returns The item.
        */
         static  randomItem( array)
        {
            const max = array.length;
            let index = ~~(Math.random() * max);

            let item = array[index];
            return item;
        }
    }
