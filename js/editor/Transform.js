export class Transform {
    constructor() {

    }

    static setPosX(transform, model) {
        transform.addEventListener('keypress', e => {

            let {
                value
            } = transform;
            const enter = e.keyCode === 13;
            const {
                position
            } = model;
            if (enter) {
                position.x = value;
            }
        });
    }

    static setPosY(transform, model) {
        transform.addEventListener('keypress', e => {

            let {
                value
            } = transform;

            const enter = e.keyCode === 13;
            const {
                position
            } = model;

            if (enter) {
                position.y = value;
            }
        });
    }

    static setPosZ(transform, model) {
        transform.addEventListener('keypress', e => {

            let {
                value
            } = transform;

            const enter = e.keyCode === 13;
            const {
                position
            } = model;

            if (enter) {
                position.z = value;
            }
        });
    }


    static setRotX(transform, model) {
        transform.addEventListener('keypress', e => {

            let {
                value
            } = transform;

            const enter = e.keyCode === 13;
            const {
                rotation
            } = model;

            if (enter) {
                rotation.x = value;
            }
        });
    }

    static setRotY(transform, model) {
        transform.addEventListener('keypress', e => {

            let {
                value
            } = transform;

            const enter = e.keyCode === 13;
            const {
                rotation
            } = model;

            if (enter) {
                rotation.y = value;
            }
        });
    }

    static setRotZ(transform, model) {
        transform.addEventListener('keypress', e => {

            let {
                value
            } = transform;

            const enter = e.keyCode === 13;
            const {
                rotation
            } = model;

            if (enter) {
                rotation.z = value;
            }
        });
    }

    static setScaleX(transform, model) {
        transform.addEventListener('keypress', e => {

            let {
                value
            } = transform;

            const enter = e.keyCode === 13;
            const {
                scale
            } = model;

            if (enter) {
                scale.x = value;
            }
        });
    }

    static setScaleY(transform, model) {
        transform.addEventListener('keypress', e => {

            let {
                value
            } = transform;

            const enter = e.keyCode === 13;
            const {
                scale
            } = model;

            if (enter) {
                scale.y = value;
            }
        });
    }
    static setScaleZ(transform, model) {
        transform.addEventListener('keypress', e => {

            let {
                value
            } = transform;

            const enter = e.keyCode === 13;
            const {
                scale
            } = model;

            if (enter) {
                scale.z = value;
            }
        });
    }
}