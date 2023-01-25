var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = new Image();
var x = 0;
var y = 0;

canvas.width= 1080;
canvas.height= 1080;

function BackgorundEE() {
    var fileInput = document.getElementById("BackgorundEE");
    img.src = URL.createObjectURL(fileInput.files[0]);

    img.onload = function() {            
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw the image on the canvas, scaling it to fit
        ctx.drawImage(img, 0, 0, img.width, img.height, x, y, 1080, 1080);
    };
}

function AddUserPhoto() {
    var fileInput = document.getElementById("AddUserPhoto");
    img.src = URL.createObjectURL(fileInput.files[0]);

    img.onload = function() {            
        // clear the canvas
        ctx.clearRect(0, 0, 540, 540);  // Where To clear {X} {Y} by {xd} {yd}
        // draw the image on the canvas, scaling it to fit
        ctx.drawImage(img, 0, 0, img.width, img.height, x, y, 540, 540);
    };
}

function downloadEE() {
    // get the data URL of the canvas
    var dataURL = canvas.toDataURL("image/jpeg", 1.0);
    // create an anchor element
    var a = document.createElement("a");
    a.download = "EE.jpg";
    a.href = dataURL;
    // simulate a click on the anchor element
    a.click();
  }



