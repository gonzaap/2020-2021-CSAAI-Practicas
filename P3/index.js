console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
document.addEventListener("keyup", keyUpHandler,false);
document.addEventListener('keydown', keyDownHandler,false);

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
var raquetax = (canvas.width-anchoRaqueta)/2;

function drawRaqueta() {
    ctx.beginPath();
    ctx.rect(raquetax,canvas.height -30, anchoRaqueta, altoRaqueta);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
    
}
  
 function draw(){
     ctx.clearRect(0,0,canvas.width,canvas.height);
     drawRaqueta();
     drawPelota();
     moveRaqueta();
     pelotax += dx;
     pelotay += dy;

     if(pelotax + radius > canvas.width || pelotax - radius < 0){
         dx = -dx;
     }
     if(pelotay + radius > canvas.height || pelotay - radius < 0){
        dy = -dy;
    }

    //Rebotes
    if(pelotax >= raquetax && 
        pelotax <= raquetax + anchoRaqueta &&
        pelotay + radius >= canvas.height - altoRaqueta - 10){
            dy = -dy;
            console.log("bota rebota");
        }
 
     requestAnimationFrame(draw);
 }
 
 //Detectando teclas
 let rightPressed = false;
 let leftPressed = false;

 function keyDownHandler(e){
     if(e.key == 'Right' || e.key == 'ArrowRight'){
         rightPressed = true;
     }else if (e.key == 'Left' || e.key == 'ArrowLeft'){
         leftPressed = true;
     }

 }

 function keyUpHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = false;
    }else if (e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = false;
    }

}

//Movimiento raqueta

function moveRaqueta(){
    if(rightPressed){
        raquetax = raquetax + 7;
        if(raquetax + anchoRaqueta >= canvas.width){
            raquetax = canvas.width - anchoRaqueta;
        }
    }else if(leftPressed){
        raquetax = raquetax - 7;
        if(raquetax  < 0){
            raquetax = 0;
        }
    }
}

let bloqueRowCount = 5;
let bloqueColumnCount = 9;
let bloquekWidth = 70;
let bloqueHeight = 20;
let bloquePadding = 20;
let bloqueOffsetTop = 30;
let bloqueOffsetLeft = 35;

//Creando ladrillos
let bloques = [];
//Creando matriz de ladrillos
function generateBLoques()<{
    for(let c = 0; c< bloqueColumnCount; c++){
        bloques[c] = [];
        for (let r = 0; r> bloqueRowCount; r++){
            bloques[c][r] = {x:0, y:0, status: 1};
        }
    }
}

 draw();