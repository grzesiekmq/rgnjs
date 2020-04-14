import {
    Transform
} from './Transform.js';

export function displayEntity(model) {


    function entityCallback() {

        console.log('c')

        const html = addTransformTpl(model);
        $('.transform').append(html);

        const posX = document.querySelector('#posX');
        const posY = document.querySelector('#posY');
        const posZ = document.querySelector('#posZ');

        const rotX = document.querySelector('#rotX');
        const rotY = document.querySelector('#rotY');
        const rotZ = document.querySelector('#rotZ');

        const scaleX = document.querySelector('#scaleX');
        const scaleY = document.querySelector('#scaleY');
        const scaleZ = document.querySelector('#scaleZ');

        function setPos() {
            Transform.setPosX(posX, model);
            Transform.setPosY(posY, model);
            Transform.setPosZ(posZ, model);
        }

        function setRot() {

            Transform.setRotX(rotX, model);
            Transform.setRotY(rotY, model);
            Transform.setRotZ(rotZ, model);
        }

        function setScale() {

            Transform.setScaleX(scaleX, model);
            Transform.setScaleY(scaleY, model);
            Transform.setScaleZ(scaleZ, model);
        }
        setPos();
        setRot();
        setScale();
    }
    // $('#entity').one('click', entityCallback);
}