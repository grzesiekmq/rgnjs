import {
    JSONGenerator
} from "./JSONGenerator.js";

export function generateCarData() {

    const jsonGen = new JSONGenerator();

    $(document.body).on('click', '#generate', function(e) {
        e.preventDefault();

        const data = jsonGen.getData('#json');
        console.log(data);
        console.log(JSON.stringify(data));
    });
}