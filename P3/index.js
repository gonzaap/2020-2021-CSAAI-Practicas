var raqueta;
const canvas = document.getElementById("canvas");
//Creando canvas
function setup(){
    canvas.width = 900;
    canvas.height = 600;
    raqueta = new raqueta();
}
//Dibujando elementos
function draw(){
    player.move();
    player.show();
}