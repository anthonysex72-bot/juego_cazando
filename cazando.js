let canvas=document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTO_GATO = 100;
const ANCHO_GATO = 100;
const ALTO_COMIDA = 50;
const ANCHO_COMIDA = 50;

let gatoX = (canvas.width - ANCHO_GATO) / 2;
let gatoY = (canvas.height - ALTO_GATO) / 2;
let comidaX = 0;
let comidaY = 0;
let puntos=0;


function graficarGato(){
    ctx.fillStyle="black";
    ctx.fillRect(gatoX,gatoY,ANCHO_GATO,ALTO_GATO,"black");
}

function graficarComida() {
    ctx.fillStyle = "red";
    ctx.fillRect(comidaX,comidaY,ANCHO_COMIDA,ALTO_COMIDA,"red");

}

function iniciarJuego() {
    graficarGato();
    graficarComida();
}


function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function graficarRectangulo(x,y,ancho,alto,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,ancho,alto);
}

function moverIzquierda(){
    gatoX=gatoX - 10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectaColicion();

}

function moverDerecha(){
    gatoX = gatoX + 10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectaColicion();
}

function moverArriba(){
    gatoY = gatoY - 10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectaColicion();

}

function moverAbajo(){
    gatoY = gatoY + 10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectaColicion();
}

function detectaColicion(){
    if(
        gatoX+ANCHO_GATO > comidaX &&
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoY + ALTO_GATO > comidaY &&
        gatoY < comidaY + ALTO_COMIDA
    ){
        alert("EL GATO COMIO!");
        puntos=puntos + 1;
        mostrarEnSpan("puntos", puntos);
        comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
        comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);
        limpiarCanvas();
        graficarGato();
        graficarComida();
    }
}
