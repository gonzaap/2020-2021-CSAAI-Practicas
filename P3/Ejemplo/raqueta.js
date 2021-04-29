function raqueta(){

    this.ctx = ctx;
    this.x = width /2;
    this.y = height -50;
    this.width = 100;
    this.height = 20;
    this.v = 5;
//Muestra siempre la raqueta
   this.show = function ()<{
       rectMode(CENTER);
       rect(this.x,this.y,this.width,this.height);
   }
//Funcion movimiento con raton
    this.move = function(){
        if(mouseX > this.x)
            this.x += this.v;
        else if (mouseX < this.x)
            this.x -= this.v;
    }
}