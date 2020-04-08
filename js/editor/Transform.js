export class Transform {
    constructor() {

    }

    static setPosX(transform, model) {
        transform.addEventListener('keypress', e => {
            let value = transform.value;
            const enter = e.keyCode === 13;
            if (enter) {
                model.position.x = value;
            }
        });
    }

    static setPosY(transform, model) {
        transform.addEventListener('keypress', e => {
            let value = transform.value;
            const enter = e.keyCode === 13;
            if (enter) {
                model.position.y = value;
            }
        });
    }

    static setPosZ(transform, model) {
        transform.addEventListener('keypress', e => {
            let value = transform.value;
            const enter = e.keyCode === 13;
            if (enter) {
                model.position.z = value;
            }
        });
    }


    static setRotX(transform, model) {
        transform.addEventListener('keypress', e => {
            let value = transform.value;
            const enter = e.keyCode === 13;
            if (enter) {
                model.rotation.x = value;
            }
        });
    }

    static setRotY(transform, model) {
        transform.addEventListener('keypress', e => {
            let value = transform.value;
            const enter = e.keyCode === 13;
            if (enter) {
                model.rotation.y = value;
            }
        });
    }

    static setRotZ(transform, model) {
        transform.addEventListener('keypress', e => {
            let value = transform.value;
            const enter = e.keyCode === 13;
            if (enter) {
                model.rotation.z = value;
            }
        });
    }

    static setScaleX(transform, model) {
        transform.addEventListener('keypress', e => {
            let value = transform.value;
            const enter = e.keyCode === 13;
            if (enter) {
                model.scale.x = value;
            }
        });
    }

    static setScaleY(transform, model) {
        transform.addEventListener('keypress', e => {
            let value = transform.value;
            const enter = e.keyCode === 13;
            if (enter) {
                model.scale.y = value;
            }
        });
    }
    static setScaleZ(transform, model) {
        transform.addEventListener('keypress', e => {
            let value = transform.value;
            const enter = e.keyCode === 13;
            if (enter) {
                model.scale.z = value;
            }
        });
    }
}