var canvas = document.getElementById("canvas");
var dwn = document.getElementById('btndownload')
canvas.width= 1024;
canvas.height= 1024;
// canvas.width= window.innerWidth;
// canvas.height= window.innerHeight;preview

document.getElementById("canvas").style.display = "none"; // after
//document.getElementById("canvas").style.visibility = "hidden"; // before 
document.getElementById("preview").style.display = "none"; // after
//document.getElementById("preview").style.visibility = "hidden"; // before

document.getElementById("download").style.display = "none"; //after
//document.getElementById("download").style.visibility = "hidden"; // before

var context = canvas.getContext("2d");

// var background = new Image();
// background.src = "bg.png";
// background.onload = function(){
// context.drawImage(background,0,0);   
// }

function PreviewImage(input) {
   
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('preview').setAttribute("src",e.target.result);
    };
    reader.readAsDataURL(input.files[0]);

   
    
}

function setImage() {
    // document.getElementById('preview').setAttribute("src",'bg1.png');
    
    var image = new Image();
    image.src = "bg1.png";
    var image = document.getElementById('preview');
    // canvas.width= image.clientWidth;
    // canvas.height= image.clientHeight;

    context.drawImage(image,0,0,1024,1024);
    // context.drawImage(image,50,50,500,500);

    // context.drawImage(image, -190,0);
    // context.drawImage(image, 0,-190,image.clientWidth*6,image.clientHeight*6);
    // context.drawImage(image, canvas.width/4,400,400,300);

    // WebFont.load({
	// 	google: {
	// 		families: ['Almarai:300,400,700']
	// 	}
	// });
    context.font= '35px Almarai';
    context.fillStyle= '#4A5456';
    context.textAlign= 'center';

    context.moveTo(0,canvas.height/2);
  
    context.fillText(document.getElementById("txtName").value,canvas.width/2,(canvas.height/2)+260);



    document.getElementById("preview").style.visibility = "hidden";

    var image = canvas.toDataURL("image/jpg");
    // document.getElementById("download").href = image;
    // document.getElementById("download").setAttribute("download", "myumage.jpg");
    document.getElementById("download").setAttribute("href", image);
    // setTimeout(function(){
    //     //  alert("Hello"); 
        
        
    //     }, 2000);
    $('#download')[0].click();
   
    // document.getElementById("download").style.visibility = "visible";
    // document.getElementById("download").disabled  = true;
    // document.getElementById("canvas").style.visibility = "visible";
    // setTimeout(function(){
    //     //  alert("Hello"); 
    // document.getElementById("download").disabled  = false;
        
    //     }, 6000);


    
    // $('#exampleModal').modal('show');

}


download_img = function(el) {
 
  var image = canvas.toDataURL("image/jpg");
  el.href = image;
};



