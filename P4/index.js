console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('foto1')
const ctx = canvas.getContext('2d');

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

  let i = 200 + 50*canvas.width;

  //-- Pixel rojo: canal rojo a tope. Resto de colores a 0
  //-- La transparencia no se modifica
  data[i*4] = 255;    //-- Canal Rojo
  data[i*4 + 1] = 0;  //-- Canal Verde
  data[i*4 + 2] = 0;  //-- Canal azul
  
  ctx.putImageData(imgData, 0, 0);
};

console.log("Fin...");