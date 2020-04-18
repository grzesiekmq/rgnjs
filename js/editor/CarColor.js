import {
    model
} from '../app.js'

const colorGUI = new dat.GUI();
export function setCarColor() {

    colorGUI.hide();

    const params = {
        color: "#ffffff",
        metalness: 1,
        roughness: 1
    }

    let carColor = colorGUI.addColor(params, 'color').listen()
    let carMetalness = colorGUI.add(params, 'metalness', 0, 1, .1).listen()
    let carRoughness = colorGUI.add(params, 'roughness', 0, 1, .1).listen()

    const partName = 'Paint';
    carColor.onChange((value) => model.getObjectByName(partName)
        .children[0]
        .material
        .color.setHex(value.replace("#", "0x")))

    carMetalness.onChange((value) => model.getObjectByName(partName)
        .children[0]
        .material
        .metalness = value)

    carRoughness.onChange((value) => {
        model.getObjectByName(partName)
            .children[0]
            .material
            .roughness = value

    })
}
export {
    colorGUI
}