function loadTemplate(iframeId, id) {
    const iFrame = document.querySelector(iframeId);
    if (!iFrame || !iFrame.contentDocument) {
        console.log('missing iframe or iframe can not be retrieved ' + iframeId);
        return "";
    }

    const el = iFrame.contentDocument.querySelector(id);
    if (!el) {
        console.log('iframe element can not be located ' + id);
        return "";
    }

    return el;
}

function addCameraNameTpl(camera) {

    const tpl = loadTemplate('#template-camera-name', '#camera-name');

    const template = $(tpl).html();

    // Compile the template data into a function
    const templateScript = Handlebars.compile(template);

    const context = {
        "name": camera.name
    };

    const html = templateScript(context);

    // Insert the HTML code into the page
    $('.hierarchy').append(html);
}

function addTransformTpl() {

    const tpl = loadTemplate('#template-transform', '#transform');

    const template = $(tpl).html();

    // Compile the template data into a function
    const templateScript = Handlebars.compile(template);

    const context = {};

    const html = templateScript(context);

    return html;

}

function addCarTpl() {

    const tpl = loadTemplate('#template-car-props', '#car-props');

    const template = $(tpl).html();

    // Compile the template data into a function
    const templateScript = Handlebars.compile(template);

    const {
        topSpeed,
        hp,
        weight,
        wheelBase,
        rearTrack,
        turnRadius,
        wheelRadius,
        rpm,
        fuelConsumption,
        tireExploit
    } = car;

    const context = {
        topSpeed,
        hp,
        weight,
        wheelBase,
        rearTrack,
        turnRadius,
        wheelRadius,
        rpm,
        fuelConsumption,
        tireExploit,
        driveType: ['fwd', 'rwd', 'awd'],
        transmission: ['AT', 'MT'],
        carType: [
            'Racecar',
            'Supercar',
            'Drift',
            'Drag',
            'Rally',
            'Sports',
            'Concept',
            'Hypercar',
            'Tuned'
        ],
        racingType: [
            'GTR',
            'F1',
            'Touring'
        ],
        paint: [
            'Matte',
            'Chrome',
            'Metallic',
            'Pearl',
            'Solid'
        ],
        price: ['Usd',
            'Eur'
        ]

    };

    const html = templateScript(context);

    return html;

}

export {
    addCameraNameTpl,
    addTransformTpl,
    addCarTpl
}