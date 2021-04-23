let digitos = document.getElementsByClassName("digito");
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
  }
  
let estado = ESTADO.INIT
    display.innerHTML = ev.target.value;
    function calculadora(ev)
    {
        if (estado == ESTADO.INIT) {
          display.innerHTML = ev.target.value;
          estado = ESTADO.OP1;}
        else if (estado == ESTADO.OP1){
          
        } 
    }
