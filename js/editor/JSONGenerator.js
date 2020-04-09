export class JSONGenerator {

    constructor() {

    }

    generateObj(obj, arr, val) {
        if (arr.length === 1) {
            obj[arr[0]] = val;
            return;
        }
        if (!obj[arr[0]]) {
            obj[arr[0]] = {};
        }
        const restArr = arr.splice(1);
        this.generateObj(obj[arr[0]], restArr, val);
    }

    getData(id) {
        const form = document.querySelector(id);

        const controlsCollection = form.querySelectorAll('input, textarea, select');

        const controlsArray = [...controlsCollection];
        const data = {};
        controlsArray.map(input => {
            const {
                name,
                value
            } = input;
            const splitName = name.split('.');
            this.generateObj(data, splitName, value);
        })
        return data;
    }
}