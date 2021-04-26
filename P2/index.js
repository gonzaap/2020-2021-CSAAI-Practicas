display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
del = document.getElementById("delete")
let digitos = document.getElementsByClassName("digito");
let operacion = document.getElementsByClassName("operación")
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
  }

let estado = ESTADO.INIT
    
    function calculadora(digito)
{
    //-- Se ha recibido un dígito
    //-- Según en qué estado se encuentre la calculadora
    //-- se hará una cosa u otra

    //-- Si es el primer dígito, no lo añadimos,
    //-- sino que lo mostramos directamente en el display
    if (estado == ESTADO.INIT) {

        display.innerHTML = digito;

        //-- Pasar al siguiente estado
        estado = ESTADO.OP1;
      }else if (estado == ESTADO.OP1){
        display.innerHTML += digito;
    } else if (estado == ESTADO.OPERATION){
      display.innerHTML += digito;
      estado = ESTADO.OP2;
  }   else if (estado == ESTADO.OP2){
    display.innerHTML += digito;
  }
}
for (i=0; i<digitos.length; i++){
  digitos[i].onclick = (ev) =>{
    calculadora(ev.target.value);
  } 
}

function operaciones(operador){
  if (estado != ESTADO.OPERATION) {
    display.innerHTML += operador;
    estado = ESTADO.OPERATION;
  }
}

for (i=0; i<operacion.length; i++){
  operacion[i].onclick = (ev)=>{
    if(estado == ESTADO.OP1){
           display.innerHTML += ev.target.value;
           estado = ESTADO.OPERATION;
         }
      }
}

//-- Evaluar la expresion
igual.onclick = () => {
  if(estado == ESTADO.OP1 ||  estado == ESTADO.OP2){
     display.innerHTML = eval(display.innerHTML);
     estado = ESTADO.OP1;
   }
 }

//-- Poner a cero la expresion
//-- Y volver al estado inicial
clear.onclick = () => {
display.innerHTML = "0";
estado = ESTADO.INIT;
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
    console.log("clear");
    estado = ESTADO.INIT;
}