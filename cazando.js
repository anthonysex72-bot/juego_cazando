let canvas=document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTO_GATO = 100;
const ANCHO_GATO = 100;
const ALTO_COMIDA = 50;
const ANCHO_COMIDA = 50;
const ALTO_OBJETO=20;
const ANCHO_OBJETO=30;
const ANCHO_PREMIO=50;
const ALTO_PREMIO=40;

let gatoX = (canvas.width - ANCHO_GATO) / 2;
let gatoY = (canvas.height - ALTO_GATO) / 2;
let comidaX = 0;
let comidaY = 0;
let puntos=0;
let tiempo=10;
let intervalos;
let color=0;
let objetoX=(canvas.width-ANCHO_OBJETO)/3;
let objetoY=(canvas.height-ALTO_OBJETO)/3
let premioX=(canvas.width-ANCHO_OBJETO)/3;
let premioY=(canvas.height-ALTO_OBJETO)/3;
let colorPremio="green";


function graficarGato(){
    ctx.fillStyle="red";
    ctx.fillRect(gatoX,gatoY,ANCHO_GATO,ALTO_GATO,"black");
}

function graficarComida() {
    ctx.fillStyle = "red";
    ctx.fillRect(comidaX,comidaY,ANCHO_COMIDA,ALTO_COMIDA,"red");

}

function iniciarJuego() {
    graficarGato();
    graficarComida();
    graficarObjetos();
    graficarPremio();

  
    intervalos=setInterval(restarTiempo,1000);
}


function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function graficarRectangulo(x,y,ancho,alto,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,ancho,alto);
}

function moverIzquierda(){
    objetoX=objetoX-10
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectaPremio();
    graficarObjetos();
    graficarPremio();
    
    

}

function moverDerecha(){
   objetoX=objetoX+10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectaPremio();
    graficarObjetos();
    graficarPremio();
    
   
    
}

function moverArriba(){
    objetoY=objetoY-10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectaPremio();
    graficarObjetos();
    graficarPremio();
    
    
    

}

function moverAbajo(){
    objetoY=objetoY+10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectaPremio();
    graficarObjetos();
    graficarPremio
    
    
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
        if(puntos == 6){
             alert("¡GANASTE!");
            clearInterval(intervalos);
        
        }

        comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
        comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);
        limpiarCanvas();
        graficarGato();
        graficarComida();
       
        
    }
}

function restarTiempo(){
    
    tiempo=tiempo-1;
    mostrarEnSpan("tiempo",tiempo);
    
    if(tiempo == 0){
        alert("GAME OVER");
        clearInterval(intervalos);
    }
}


function reiniciarJuego(){
    puntos = 0;
    tiempo = 10;

    mostrarEnSpan("puntos", puntos);
    mostrarEnSpan("tiempo", tiempo);

    clearInterval(intervalos);
    intervalos = setInterval(restarTiempo, 1000);

    gatoX = (canvas.width - ANCHO_GATO) / 2;
    gatoY = (canvas.height - ALTO_GATO) / 2;

    comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
    comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);

    limpiarCanvas();
    graficarGato();
    graficarComida();
    graficarPremio();
    graficarObjetos();
    detectaPremio();
    
}

function graficarObjetos(){
    ctx.fillStyle="blue";
    ctx.fillRect(objetoX,objetoY,ANCHO_OBJETO,ALTO_OBJETO);
}


function graficarPremio(x,y,ancho,alto,color){
    ctx.fillStyle=colorPremio;
    ctx.fillRect(premioX,premioY,ANCHO_PREMIO,ALTO_PREMIO);

}

function detectaPremio(){
    if(
        objetoX+ANCHO_OBJETO > premioX &&
        objetoX < premioX + ANCHO_PREMIO &&
        objetoY + ALTO_OBJETO > premioY &&
        objetoY < premioY + ALTO_PREMIO
    ){
        alert("EL objeto choco!");
        puntos=puntos + 1;
        mostrarEnSpan("puntos", puntos);
        if(puntos == 6){
             alert("¡GANASTE!");
            clearInterval(intervalos);
        
        }

        if(puntos==3){
            colorPremio="black";
            
        }
        
        premioX = generarAleatorio(0, canvas.width - ANCHO_PREMIO);
        premioY = generarAleatorio(0, canvas.height - ALTO_PREMIO);
        limpiarCanvas();
        graficarPremio();
        graficarObjetos();
       
        
    }
}









