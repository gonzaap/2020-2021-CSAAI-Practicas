console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('foto1')
const ctx = canvas.getContext('2d');
const r = document.getElementById('r')
const g = document.getElementById('g')
const b = document.getElementById('b')
const rangered_value = document.getElementById('rangered_value')
const rangegreen_value = document.getElementById('rangegreen_value')
const rangeblue_value = document.getElementById('rangeblue_value')
const colores = document.getElementById('colores');
const grises = document.getElementById('grises');
const negativo = document.getElementById('negativo');
const deslizadores = document.getElementById('deslizadores');

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  console.log("Imagen cargada");

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);
  
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data

  console.log("Tamaño de data: " + data.length)
  npixels = canvas.width * canvas.height
  console.log("Anchura (en pixeles): " + canvas.width)
  console.log("Altura (en pixeles): " + canvas.height)
  console.log("Pixeles totales: " + npixels)
}


function cambiarNegativo(){
  ctx.drawImage(img, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;

  for ( var i = 0; i < data.length; i+=4 ) {
    var red = data[i];
    var green = data[i+1];
    var blue = data[i+2];

    data[i] = 255 - red;
    data[i+1] = 255 - green;
    data[i+2] = 255 - blue;
  }
  ctx.putImageData( imgData, 0, 0 );
}

function cambiarGrises(){
  ctx.drawImage(img, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  //-- Calcular el brillo para CADA PIXEL y ponerselo por igual a cada componente
  for (var i = 0; i < data.length; i+=4) {
    var red = data[i];
    var green = data[i+1];
    var blue = data[i+2];
    var brillo = (3 * red + 4 * green + blue)/8
    data[i] = brillo;
    data[i+1] = brillo;
    data[i+2] = brillo;
  }
  ctx.putImageData(imgData, 0, 0);
}

function editarColor (){
    //--Imagen original en el canvas
    rangered_value.innerHTML = r.value;
    rangegreen_value.innerHTML = g.value;
    rangeblue_value.innerHTML = b.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data

    //--Obteniendo valor de deslizadores
    umbralred = r.value
    umbralgreen = g.value
    umbralblue = b.value

    //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbralred)
        data[i] = umbralred;

    if (data[i+1] > umbralgreen)
        data[i+1] = umbralgreen;

    if (data[i+2] > umbralblue)
        data[i+2] = umbralblue;
  }

  ctx.putImageData(imgData, 0, 0);

}

//--Llamamos la función para cada deslizador
function display(){
    ctx.drawImage(img, 0,0);

    r.oninput = () =>{
        editarColor()
    }
    
    g.oninput = () =>{
        editarColor()
    }
    
    b.oninput = () =>{
        editarColor()
    }
}
//-- Funcion de retrollamada al boton COLORES
colores.onclick = () => {
    r.value = 255;
    g.value = 255;
    b.value = 255;
    display();
    document.getElementById('deslizadores').style.display = 'block';
  }

//-- Función de retrollamada al boton de GRISES
negativo.onclick = () => {
  cambiarNegativo();
  document.getElementById('deslizadores').style.display = 'none';
  }
//-- Función de retrollamada al boton de GRISES
grises.onclick = () => {
  cambiarGrises();
  document.getElementById('deslizadores').style.display = 'none';
}
console.log("Fin...");