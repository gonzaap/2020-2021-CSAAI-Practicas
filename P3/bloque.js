function bloque(x,y){
    this.x = x;
    this.y = y;
//Muestra siempre la raqueta
    this.show = function(){
        fill(255,255,255);
        rect(this.x,this.y,40,20); //POsición raqueta
    }
}