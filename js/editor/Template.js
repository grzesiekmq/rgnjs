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



export {
    addCameraNameTpl
}