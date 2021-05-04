console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const COLLISION_SOUND = new Audio();
const PADDLE_SOUND = new Audio();
const LOSING_LIFE = new Audio();
const WALL_SOUND = new Audio();
const GAMEOVER_SOUND = new Audio();
const WIN_SOUND = new Audio();
COLLISION_SOUND.src = 'collision_sound.mp3';
PADDLE_SOUND.src = 'paddle_sound.mp3';
LOSING_LIFE.src = 'losing_life.mp3';
WALL_SOUND.src = 'wall_sound.mp3';
GAMEOVER_SOUND.src = 'gameover_sound.mp3';
WIN_SOUND.src = 'win_sound.mp3';
document.addEventListener("keyup", keyUpHandler,false);
document.addEventListener('keydown', keyDownHandler,false);

//-- Definir el tamaño del canvas
canvas.width = 1000;
canvas.height = 800;

let speedx = 0;
let speedy = 5;
var speed = (Math.random()*10) +1;
//Definiendo pelota
    var pelotax= canvas.width/2;
    var pelotay= canvas.height -300;
    var dx= 0;
    var dy= 0;
    var radius= 7;
function drawPelota() {
    ctx.beginPath();
    ctx.arc(pelotax, pelotay, radius, 0, Math.PI*2,true);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.closePath();
}

window.onkeydown = (e) => {
    if (e.keyCode == 32){
        dx = speedx;
        dy = speedy;
    }
}

//Definiendo raqueta
var anchoRaqueta = 100;
var altoRaqueta = 20; 
var raquetax = (canvas.width-anchoRaqueta)/2;

function drawRaqueta() {
    ctx.beginPath();
    ctx.rect(raquetax,canvas.height -30, anchoRaqueta, altoRaqueta);
    ctx.fillStyle = "#1102A5 ";
    ctx.fill();
    ctx.closePath();
    
}
let vidas = 3;
let score = 0;
  
 function draw(){
     document.getElementById('init').style.display = 'none';
     document.getElementById("gameovergif").style.display = "none";
     document.getElementById("wingif").style.display = "none";
     document.getElementById('you_win').style.display = 'none';
     document.getElementById('you_lose').style.display = 'none';
     ctx.clearRect(0,0,canvas.width,canvas.height);
     drawRaqueta();
     drawPelota();
     moveRaqueta();
     drawBloques();
     collisionDetection();
     drawScore();
     drawLives();
     wallCollision();
     gameOver();
     win();
     pelotax += dx;
     pelotay += dy;

    //Rebotes
    if(pelotax >= raquetax && 
        pelotax <= raquetax + anchoRaqueta &&
        pelotay + radius >= canvas.height - altoRaqueta - 10){
            let puntoColision = pelotax - (raquetax + anchoRaqueta/2);
            puntoColision = puntoColision / (anchoRaqueta/2);
            let angle = puntoColision * Math.PI/3;
            dx = speed * Math.sin(angle);
            dy = -speed * Math.cos(angle);
            console.log("bota rebota");
            PADDLE_SOUND.play();
        }
 
     requestAnimationFrame(draw);
 }
 function wallCollision(){
    if(pelotax + radius > canvas.width || pelotax - radius < 0){
        dx = -dx;
        WALL_SOUND.play();
    }
    if(pelotay + radius > canvas.height || pelotay - radius < 0){
       dy = -dy;
       WALL_SOUND.play();
    }
    
    if(pelotay + radius > canvas.height){
        vidas--;
        LOSING_LIFE.play();
        pelotax = canvas.width /2;
        pelotay = canvas.height -50;
        dx = 0;
        dy = 0;
        reset();
    }
 }

 function reset(){
    pelotax = canvas.width/2;
    pelotay= canvas.height -300;
    dx= 0;
    dy= 0;
    anchoRaqueta = 100;
    altoRaqueta = 20; 
    raquetax = (canvas.width-anchoRaqueta)/2;
 }
  
 function drawScore(){
     ctx.font = '16px Arial';
     ctx.fillStyle = '#FFF9FB';
     ctx.fillText('Score: ' + score, 20, 20);
 }

 function drawLives(){
    ctx.font = '16px Arial';
    ctx.fillStyle = '#FFF9FB';
    ctx.fillText('Lives: ' + vidas, 920,20);
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

const LADRILLO = {
    F: 10,   //-- Filas
    C: 9,   //-- Columnas
    w: 90,  //-- Anchura
    h: 20,  //-- Altura
    padding: 10,  //-- Espacio alrededor del ladrillo
    visible: true //-- Estado del ladrillo: activo o no
  }
  

//-- Creación de los ladrillos. La estructura se almacena 
//-- en el objeto ladrillos, que inicialmente está vacío
const ladrillos = [];

//-- Recorrer todas las filas. La variable i toma valores de 0 hasta F-1 (número de filas)
for (let i = 0; i < LADRILLO.F; i++) {
  ladrillos[i] = [];  //-- Inicializar la fila. Las filas son a su vez Arrays que inicialmente están vacíos

  //-- Recorrer las C columnas de la fila i. La variable j toma valores de 0 hasta C-1 (numero de columnas)
  for (let j = 0; j < LADRILLO.C; j++) {

    //-- Calcular valores para el ladrillo de la fila i y la columna j
    //-- Algunos valores son constates. Otros depeden de i y j
    ladrillos[i][j] = {
      x: (LADRILLO.w + LADRILLO.padding) * j,
      y: (LADRILLO.h + LADRILLO.padding) * i,
      w: LADRILLO.w,
      h: LADRILLO.h,
      padding: LADRILLO.padding,
      visible: LADRILLO.visible
    };
  }
}
//Dibujando ladrillos
function drawBloques(){
    //-- Dibujar ladrillos
    for (let i = 1; i < LADRILLO.F; i++) {
    for (let j = 1; j < LADRILLO.C; j++) {

      //-- Si el ladrillo es visible se pinta
      if (ladrillos[i][j].visible) {
        ctx.beginPath();
        ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
        ctx.fillStyle = '#E10033 ';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

  function collisionDetection(){
      for (let i = 1; i < LADRILLO.F; i++){
        for (let j = 1; j < LADRILLO.C; j++){
            //-- Si el ladrillo es visible se pinta
            if (ladrillos[i][j].visible){
                if( pelotax >= ladrillos[i][j].x &&
                    pelotax <= ladrillos[i][j].x + LADRILLO.w &&
                    pelotay >= ladrillos[i][j].y && 
                    pelotay <=ladrillos[i][j].y + LADRILLO.h)
                    {
                        dy = -dy;
                        ladrillos[i][j].visible = false;
                        COLLISION_SOUND.play();
                        score++
                    }
                    
            }
        }
      }
  }
  function gameOver(){
    if (vidas == 0){
        LOSING_LIFE.muted = true;
        GAMEOVER_SOUND.play();
        document.getElementById('gameovergif').style.display = '';
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('init').style.display = '';
        document.getElementById('you_lose').style.display = '';
        stopAudio();
    }
  }
 function win(){
     if(score == 1){
        COLLISION_SOUND.muted = true;
        WALL_SOUND.muted = true; 
        WIN_SOUND.play();
        document.getElementById('wingif').style.display = '';
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('init').style.display = '';
        document.getElementById('you_win').style.display = '';
        stopAudio();
     }
 }
 draw();