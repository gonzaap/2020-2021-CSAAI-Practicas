console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//-- Definir el tamaño del canvas
canvas.width = 900;
canvas.height = 800;

//Definiendo raqueta
var anchoRaqueta = 100;
var altoRaqueta = 20; 
var x = (canvas.width-anchoRaqueta)/2;

function drawRaqueta() {
    ctx.beginPath();
    ctx.rect(canvas.width/2 -50,canvas.height -50 , anchoRaqueta, altoRaqueta);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();  
}

    ctx.closePath();
   

 function draw(){
     ctx.clearRect(0,0,canvas.width,canvas.height);
     drawRaqueta();
     
     
 }
 

 draw();