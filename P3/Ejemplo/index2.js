var raqueta;
var bloques = [];

//Creando canvas
function setup(){
    createCanvas(900,800)
    raqueta = new raqueta();
    for(var i = 0; i < 10; i++){
        bloques.push(new bloque(i*40,0));
    }
}
//Dibujando elementos
function draw(){
    background(0);
    raqueta.move();
    raqueta.show();
    for(var i = 0; i < bloques.length; i++){
        bloques[i].show();
    }
}