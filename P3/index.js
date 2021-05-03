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
    var dy= -speed;
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
     drawBloques();
     collisionDetection();
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

const LADRILLO = {
    F: 5,   //-- Filas
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
    for (let i = 0; i < LADRILLO.F; i++) {
    for (let j = 0; j < LADRILLO.C; j++) {

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
      for (let i = 0; i < LADRILLO.F; i++){
        for (let j = 0; j < LADRILLO.C; j++){
            //-- Si el ladrillo es visible se pinta
            if (ladrillos[i][j].visible){
                if( pelotax >= ladrillos[i][j].x &&
                    pelotax <= ladrillos[i][j].x + LADRILLO.w &&
                    pelotay >= ladrillos[i][j].y && 
                    pelotay <=ladrillos[i][j].y + LADRILLO.h)
                    {
                        dy = -dy;
                        ladrillos[i][j].visible = false;
                    }
                    
            }
        }
      }
  }
 draw();