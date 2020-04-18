import {
    guiCarParams,
    notifier,
    camera
} from '../app.js';
/** 
 * @summary
 * 
 * @param gui
 * @param model
 * 
 */
function addGuiTransform(gui, model) {
    const fTrans = gui.addFolder('Transform');
    const fPos = fTrans.addFolder('Position');
    const fRot = fTrans.addFolder('Rotation');
    const fScale = fTrans.addFolder('Scale');

    const position = {
        x: 0,
        y: 0,
        z: 0,
        resetPos: function() {
            model.position.set(0, 0, 0);
            position.x = 0;
            position.y = 0;
            position.z = 0;
        }
    };
    const rotation = {
        x: 0,
        y: 0,
        z: 0,
        resetRot: function() {
            model.rotation.set(0, 0, 0);
            rotation.x = 0;
            rotation.y = 0;
            rotation.z = 0;
        }
    };
    const scale = {
        x: 0,
        y: 0,
        z: 0
    };

    let posX = fPos.add(position, 'x', -10, 10, .1).listen();
    let posY = fPos.add(position, 'y', -10, 10, .1).listen();
    let posZ = fPos.add(position, 'z', -10, 10, .1).listen();
    fPos.add(position, 'resetPos');

    let rotX = fRot.add(rotation, 'x', -4, 4, .05).listen();
    let rotY = fRot.add(rotation, 'y', -4, 4, .05).listen();
    let rotZ = fRot.add(rotation, 'z', -4, 4, .05).listen();
    fRot.add(rotation, 'resetRot');

    let scaleX = fScale.add(scale, 'x').listen();
    let scaleY = fScale.add(scale, 'y').listen();
    let scaleZ = fScale.add(scale, 'z').listen();

    fTrans.open();

    fPos.open();
    fRot.open();
    fScale.open();

    posX.onChange(function(value) {
        model.position.x = value;

        console.log('x', value)
    });

    posY.onChange(function(value) {
        model.position.y = value;
    });

    posZ.onChange(function(value) {
        model.position.z = value;
    });

    rotX.onChange(function(value) {
        model.rotation.x = value;
    });

    rotY.onChange(function(value) {
        model.rotation.y = value;
    });

    rotZ.onChange(function(value) {
        model.rotation.z = value;
    });

}
/**
 * 
 * @param  gui 
 */
function addGuiCamera(gui) {

    const fTrans = gui.addFolder('Transform');
    const fPos = fTrans.addFolder('Position');
    const fRot = fTrans.addFolder('Rotation');

    let {
        name,
        position,
        rotation
    } = camera;

    const cameraParams = {
        name,
        cameraView: 'Near'
    };

    const pos = {
        x: 0,
        y: 0,
        z: 0,
        resetPos: function() {
            position.set(0, 0, 0);
            pos.x = 0;
            pos.y = 0;
            pos.z = 0;
        }
    };
    const rot = {
        x: 0,
        y: 0,
        z: 0,
        resetRot: function() {
            rotation.set(0, 0, 0);
            rot.x = 0;
            rot.y = 0;
            rot.z = 0;
        }
    };

    let posX = fPos.add(pos, 'x', -10, 10, .1).listen();
    let posY = fPos.add(pos, 'y', -10, 10, .1).listen();
    let posZ = fPos.add(pos, 'z', -10, 10, .1).listen();
    fPos.add(pos, 'resetPos');

    let rotX = fRot.add(rot, 'x', -4, 4).listen();
    let rotY = fRot.add(rot, 'y', -4, 4).listen();
    let rotZ = fRot.add(rot, 'z', -4, 4).listen();
    fRot.add(rot, 'resetRot');

    fTrans.open();

    fPos.open();
    fRot.open();

    posX.onChange(function(value) {
        position.x = value;
    });

    posY.onChange(function(value) {
        position.y = value;
    });

    posZ.onChange(function(value) {
        position.z = value;
    });

    rotX.onChange(function(value) {
        rotation.x = value;
    });

    rotY.onChange(function(value) {
        rotation.y = value;
    });

    rotZ.onChange(function(value) {
        rotation.z = value;
    });

    const cameraView = [
        'SideLeft',
        'SideRight',
        'Near',
        'Far',
        'Driver',
        'Front',
        'Bumper',
        'Hood'
    ];

    let cameraViewValue = gui.add(cameraParams, 'cameraView', cameraView).listen();

    cameraViewValue.onChange(function(value) {

        if (value === 'Near') {
            position.z = 5;

            console.log('near');
        } else if (value === 'Far') {
            position.z = 10;
            console.log('far');
        } else if (value === 'SideLeft') {
            console.log('side left');
        } else if (value === 'SideRight') {
            position.set(-5, 1, -2);
            rotation.y = -2;
            console.log('side right');
        } else if (value === 'Driver') {
            console.log('driver');
        } else if (value === 'Front') {
            console.log('front');
        } else if (value === 'Bumper') {
            console.log('bumper');
        } else if (value === 'Hood') {
            console.log('hood');
        }
    });

}

/**
 * 
 * @param  gui 
 */
function addGuiCarParams(gui) {
    const cars = [];


    const carParams = {
        make: '',
        model: '',
        topSpeed: 0,
        acceleration: 0,
        color: '',
        hp: 0,
        weight: 0,
        wheelbase: 0,
        rearTrack: 0,
        turnRadius: 0,
        wheelRadius: 0.0,
        RPM: 0,
        fuelConsumption: 0,
        tireExploit: 0,
        driveType: 'fwd',
        transmission: 'AT',
        carType: 'Racecar',
        racingType: '',
        differential: 'ClutchPack',
        paint: 'Matte',
        price: 'Usd',
        isLocked: true,
        isWon: false,
        isUsed: false,
        AImode: false,
        generate: function() {
            const carData = generateCarData();
            cars.push(carData);
            notifier.success('cars data added');

        },
        exportToJsonFile: function() {

            const content = `<pre id="cars-json">${JSON.stringify(cars, null, 3)}</pre> `
            $('#exampleModalScrollable').modal();
            document.querySelector('.modal-body').innerHTML = content;
            $('#download').click(function() {
                exportToJsonFile(cars);

            });

        }

    };

    const driveType = ['fwd', 'rwd', 'awd'];
    const transmission = ['AT', 'MT'];
    const carType = [
        'Racecar',
        'Supercar',
        'Drift',
        'Drag',
        'Rally',
        'Sports',
        'Concept',
        'Hypercar',
        'Tuned'
    ];
    const racingType = [
        'GTR',
        'F1',
        'Touring'
    ];
    const differential = ['ClutchPack',
        'Locked', // drift
        'Open',
        'TorqueBias',
        'Viscous'
    ];

    const paint = [
        'Matte',
        'Chrome',
        'Metallic',
        'Pearl',
        'Solid'
    ];
    const price = ['Usd',
        'Eur'
    ];

    const params = ['make',
        'model', 'topSpeed', 'acceleration', 'color', 'hp', 'weight'
    ];

    const ackermannParams = [
        'wheelbase',
        'rearTrack',
        'turnRadius',
        'wheelRadius'

    ];

    const params2 = [
        'RPM',
        'fuelConsumption',
        'tireExploit'
    ];

    const switchesArr = [
        'isLocked',
        'isWon',
        'isUsed',
        'AImode'
    ];
    const types = {
        driveType,
        carType,
        racingType,
        differential
    };

    function addParams() {
        params.map(param => gui.add(carParams, param));

        const ackermann = gui.addFolder('Ackermann steering');

        ackermannParams.map(param => ackermann.add(carParams, param));
        params2.map((param) => gui.add(carParams, param));
        gui.add(carParams, 'transmission', transmission);
        switchesArr.map(param => gui.add(carParams, param));

        const fTypes = gui.addFolder('Types');

        Object.entries(types).map(([key, value]) => fTypes.add(carParams, key, value));
        gui.add(carParams, 'paint', paint);
        gui.add(carParams, 'price', price);

        gui.add(carParams, 'generate');
        gui.add(carParams, 'exportToJsonFile').name('export to json');
    }

    addParams();

}

function generateCarData() {
    const gui = guiCarParams;

    return gui.__controllers[0].object;
}

/**
 * 
 * @param  jsonData 
 */
function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

export {
    addGuiTransform,
    addGuiCamera,
    addGuiCarParams,
    generateCarData,
    exportToJsonFile
}