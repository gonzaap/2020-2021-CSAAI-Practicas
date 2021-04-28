function raqueta(){
    this.x = width /2;
    this.y = height -50;
    this.w = 100;
    this.h = 20;
    this.v = 5;
//Muestra siempre la raqueta
    this.show = function(){
        rectMode(CENTER); //Raqueta centrada
        fill(255,255,255);
        rect(this.x,this.y,this.w,this.h); //POsición raqueta
    }
//Funcion movimiento con raton
    this.move = function(){
        if(mouseX > this.x)
            this.x += this.v;
        else if (mouseX < this.x)
            this.x -= this.v;
    }
}