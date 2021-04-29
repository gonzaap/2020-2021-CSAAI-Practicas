console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//-- Definir el tamaño del canvas
canvas.width = 900;
canvas.height = 800;

let speed = 5;
//Definiendo pelota
    var pelotax= canvas.width/2;
    var pelotay= canvas.height -300;
    var dx= speed;
    var dy= -speed +1;
    var radius= 7;
    
function drawPelota() {
    ctx.beginPath();
    ctx.arc(pelotax, pelotay, radius, 0, Math.PI*2,true);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

//Definiendo raqueta
var anchoRaqueta = 100;
var altoRaqueta = 20; 
var x = (canvas.width-anchoRaqueta)/2;


function drawRaqueta() {
    ctx.beginPath();
    ctx.rect(canvas.width/2 -50,canvas.height -50 , anchoRaqueta, altoRaqueta);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();  
}
  
 function draw(){
     ctx.clearRect(0,0,canvas.width,canvas.height);
     drawRaqueta();
     drawPelota();
     pelotax += dx;
     pelotay += dy;

     requestAnimationFrame(draw);
 }
 

 draw();