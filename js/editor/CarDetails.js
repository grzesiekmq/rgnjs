import {
    addCarTpl
} from "./Template.js";

export function displayCarDetails() {

    $('#car').one('click', () => {

        const html = addCarTpl();
        $('.transform').append(html);

    });
}