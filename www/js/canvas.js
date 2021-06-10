var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let img = document.getElementById("imgSelected");

let topLineField = document.getElementById('topLine');
let bottomLineField = document.getElementById('bottomLine');

ctx.clearRect(0, 0, canvas.width, canvas.height);

topLineField.oninput = textChangeListener;
bottomLineField.oninput = textChangeListener;

function textChangeListener() {
    redrawMeme(img, topLineField.value, bottomLineField.value);
}

function redrawMeme(image, topLine, bottomLine) {
    if (image != null)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Text attributes
    ctx.font = '20pt Impact';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'white';

    if (topLine) {
        ctx.fillText(topLine, canvas.width / 2, 30);
        ctx.strokeText(topLine, canvas.width / 2, 30);
    }

    if (bottomLine) {
        ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 10);
        ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 10);
    }
}

function handleFileSelect(evt) {
    var file = evt.target.files[0];

    var reader = new FileReader();
    reader.onload = function (fileObject) {
        var data = fileObject.target.result;

        // Create an image object
        var image = new Image();
        image.onload = function () {
            window.imageSrc = this;
            redrawMeme(window.imageSrc, null, null);
        }

        // Set image data to background image.
        image.src = data;
        console.log(fileObject.target.result);
    };
    
    reader.readAsDataURL(file)
}