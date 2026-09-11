let canvas=document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;


const ALTO_GATO = 100;
const ANCHO_GATO = 100;
const ALTO_COMIDA = 50;
const ANCHO_COMIDA = 50;


function graficarGato(){
    ctx.fillstyle="black";
    ctx.fillRect(gatoX,gatoY,ANCHO_GATO,ALTO_GATO,"black");
}

function graficarComida() {

    ctx.fillStyle = "red";

    ctx.fillRect(comidaX,comidaY,ALTO_COMIDA,ALTO_COMIDA,"red");

}

function iniciarJuego() {

    graficarGato();

    graficarComida();

}

function graficarRectangulo(x,y,ancho,alto,color){
    ctx.fillstyle=color;
    ctx.fillRect(x,y,ancho,alto);
}