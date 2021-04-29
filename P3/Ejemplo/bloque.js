function bloque(x,y){
    this.x = x;
    this.y = y;
    this.color1 = random(255);
    this.color2 = random(255);
    this.color3 = random(255);
//Muestra siempre la raqueta
    this.show = function(){
        fill(this.color1,this.color2,this.color3);
        rect(this.x,this.y,60,40); //Posición raqueta
    }
}