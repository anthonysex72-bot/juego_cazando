let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

let musicaFondo = document.getElementById("musicaFondo");
let musicaVictoria = document.getElementById("musicaVictoria");
let musicaDerrota = document.getElementById("musicaDerrota");
let sonidoComer = document.getElementById("sonidoComer");


const ALTO_GATO = 80;
const ANCHO_GATO = 80;

const ALTO_COMIDA = 45;
const ANCHO_COMIDA = 45;


let gatoX = (canvas.width - ANCHO_GATO) / 2;
let gatoY = (canvas.height - ALTO_GATO) / 2;

let comidaX = 0;
let comidaY = 0;

let puntos = 0;
let tiempoInicial=20;
let tiempo = tiempoInicial;


let intervalos;

let juegoActivo = true;


/* =========================
   GRAFICAR GATO
========================= */

function graficarGato() {

    // Cuerpo
    ctx.fillStyle = "#222";

    ctx.beginPath();

    ctx.roundRect(
        gatoX,
        gatoY + 15,
        ANCHO_GATO,
        ALTO_GATO - 15,
        15
    );

    ctx.fill();


    // Cabeza
    ctx.fillStyle = "#333";

    ctx.beginPath();

    ctx.arc(
        gatoX + 40,
        gatoY + 25,
        30,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Oreja izquierda
    ctx.fillStyle = "#444";

    ctx.beginPath();

    ctx.moveTo(gatoX + 15, gatoY + 5);
    ctx.lineTo(gatoX + 25, gatoY - 15);
    ctx.lineTo(gatoX + 35, gatoY + 10);

    ctx.fill();


    // Oreja derecha

    ctx.beginPath();

    ctx.moveTo(gatoX + 45, gatoY + 10);
    ctx.lineTo(gatoX + 60, gatoY - 15);
    ctx.lineTo(gatoX + 68, gatoY + 8);

    ctx.fill();


    // Ojos

    ctx.fillStyle = "#7cff00";

    ctx.beginPath();

    ctx.arc(
        gatoX + 30,
        gatoY + 23,
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        gatoX + 50,
        gatoY + 23,
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Nariz

    ctx.fillStyle = "#ff6b81";

    ctx.beginPath();

    ctx.arc(
        gatoX + 40,
        gatoY + 34,
        4,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Cola

    ctx.strokeStyle = "#444";

    ctx.lineWidth = 10;

    ctx.beginPath();

    ctx.moveTo(gatoX + 70, gatoY + 55);

    ctx.quadraticCurveTo(
        gatoX + 100,
        gatoY + 20,
        gatoX + 90,
        gatoY
    );

    ctx.stroke();
}


/* =========================
   GRAFICAR COMIDA
========================= */

function graficarComida() {

    // Cuerpo de la fruta

    ctx.fillStyle = "#ff4d4d";

    ctx.beginPath();

    ctx.arc(
        comidaX + 22,
        comidaY + 25,
        21,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Brillo

    ctx.fillStyle = "#ffaaaa";

    ctx.beginPath();

    ctx.arc(
        comidaX + 15,
        comidaY + 18,
        6,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Tallo

    ctx.strokeStyle = "#6b4226";

    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.moveTo(comidaX + 22, comidaY + 5);

    ctx.lineTo(comidaX + 27, comidaY - 5);

    ctx.stroke();
}


/* =========================
   FONDO DEL CANVAS
========================= */

function dibujarFondo() {

    // Fondo

    let gradiente = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    gradiente.addColorStop(0, "#18274a");
    gradiente.addColorStop(1, "#090e1c");

    ctx.fillStyle = gradiente;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Estrellas

    ctx.fillStyle = "rgba(255,255,255,0.5)";

    for (let i = 0; i < 40; i++) {

        let estrellaX = (i * 97) % canvas.width;
        let estrellaY = (i * 53) % canvas.height;

        ctx.fillRect(
            estrellaX,
            estrellaY,
            2,
            2
        );
    }


    // Suelo

    ctx.fillStyle = "rgba(60,90,150,0.15)";

    ctx.fillRect(
        0,
        canvas.height - 55,
        canvas.width,
        55
    );
}


/* =========================
   DIBUJAR TODO
========================= */

function dibujarJuego() {

    limpiarCanvas();

    dibujarFondo();

    graficarGato();

    graficarComida();
}


/* =========================
   INICIAR
========================= */

function iniciarJuego() {

    juegoActivo = true;
    mostrarEnSpan();
    musicaFondo.currentTime = 0;
    musicaFondo.play();

    comidaX = generarAleatorio(
        0,
        canvas.width - ANCHO_COMIDA
    );

    comidaY = generarAleatorio(
        0,
        canvas.height - ALTO_COMIDA
    );

    dibujarJuego();

    clearInterval(intervalos);

    intervalos = setInterval(
        restarTiempo,
        1000
    );
}


/* =========================
   LIMPIAR CANVAS
========================= */

function limpiarCanvas() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}


/* =========================
   MOVIMIENTO
========================= */

function moverIzquierda() {

    if (!juegoActivo) return;

    gatoX = gatoX - 15;

    if (gatoX < 0) {

        gatoX = 0;
    }

    actualizarJuego();
}


function moverDerecha() {

    if (!juegoActivo) return;

    gatoX = gatoX + 15;

    if (gatoX + ANCHO_GATO > canvas.width) {

        gatoX = canvas.width - ANCHO_GATO;
    }

    actualizarJuego();
}


function moverArriba() {

    if (!juegoActivo) return;

    gatoY = gatoY - 15;

    if (gatoY < 0) {

        gatoY = 0;
    }

    actualizarJuego();
}


function moverAbajo() {

    if (!juegoActivo) return;

    gatoY = gatoY + 15;

    if (gatoY + ALTO_GATO > canvas.height) {

        gatoY = canvas.height - ALTO_GATO;
    }

    actualizarJuego();
}


/* =========================
   ACTUALIZAR JUEGO
========================= */

function actualizarJuego() {

    dibujarJuego();

    detectaColicion();
}


/* =========================
   TECLADO
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft") {

        event.preventDefault();

        moverIzquierda();
    }

    else if (event.key === "ArrowRight") {

        event.preventDefault();

        moverDerecha();
    }

    else if (event.key === "ArrowUp") {

        event.preventDefault();

        moverArriba();
    }

    else if (event.key === "ArrowDown") {

        event.preventDefault();

        moverAbajo();
    }

    else if (
        event.key === "Enter" &&
        !juegoActivo
    ) {

        reiniciarJuego();
    }

});


/* =========================
   COLISIÓN
========================= */

function detectaColicion() {


    if (
        gatoX + ANCHO_GATO > comidaX &&
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoY + ALTO_GATO > comidaY &&
        gatoY < comidaY + ALTO_COMIDA
    ) {
        sonidoComer.currentTime = 0;
        sonidoComer.play();

        puntos = puntos + 1;

        mostrarEnSpan(
            "puntos",
            puntos
        );


        if (puntos >= 6) {

            juegoActivo = false;

            clearInterval(intervalos);

            musicaFondo.pause();
            musicaFondo.currentTime = 0;

            musicaVictoria.currentTime = 0;
            musicaVictoria.play();

            mostrarMensaje(
                 "🏆 ¡GANASTE! 🏆\nATRAPASTE\n6\nOBJETOS!"
            );

            return;
        }


        comidaX = generarAleatorio(
            0,
            canvas.width - ANCHO_COMIDA
        );

        comidaY = generarAleatorio(
            0,
            canvas.height - ALTO_COMIDA
        );


        dibujarJuego();
    }
}


/* =========================
   TIEMPO
========================= */

function restarTiempo() {

    if (!juegoActivo) return;

    tiempo = tiempo - 1;

    mostrarEnSpan(
        "tiempo",
        tiempo
    );


    if (tiempo <= 0) {

        juegoActivo = false;

        clearInterval(intervalos);

        musicaFondo.pause();
        musicaFondo.currentTime = 0;

        musicaDerrota.currentTime = 0;
        musicaDerrota.play();

        mostrarMensaje(
            "💀 GAME OVER 💀\nPRESIONA ENTER\n🍎 REINICIAR 🍎"
        );
    }
}


/* =========================
   REINICIAR
========================= */

function reiniciarJuego() {

    puntos = 0;

    tiempo = tiempoInicial;

    juegoActivo = true;
    musicaFondo.currentTime = 0;
    musicaFondo.play();


    mostrarEnSpan(
        "puntos",
        puntos
    );

    mostrarEnSpan(
        "tiempo",
        tiempo
    );


    mostrarMensaje("");


    gatoX = (canvas.width - ANCHO_GATO) / 2;

    gatoY = (canvas.height - ALTO_GATO) / 2;


    comidaX = generarAleatorio(
        0,
        canvas.width - ANCHO_COMIDA
    );

    comidaY = generarAleatorio(
        0,
        canvas.height - ALTO_COMIDA
    );


    clearInterval(intervalos);

    intervalos = setInterval(
        restarTiempo,
        1000
    );


    dibujarJuego();
}


/* =========================
   MENSAJE
========================= */

function mostrarMensaje(texto) {

    let mensaje =
        document.getElementById("mensaje");

    mensaje.textContent = texto;
}


/* =========================
   MOSTRAR DATOS
========================= */

function mostrarEnSpan(idSpan, valor) {

    let componente =
        document.getElementById(idSpan);

    componente.textContent = valor;
}