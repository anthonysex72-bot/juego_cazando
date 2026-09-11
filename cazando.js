let canvas=document.getElementById("areaJuego");
let ctx = canvas.getContex("2d");

function graficarGato(){
    ctx.fillstyle="black";
    ctx.fillRect(200,200,100,100);
}

function graficarComida() {

    ctx.fillStyle = "red";

    ctx.fillRect(0, 0, 50, 50);

}

function iniciarJuego() {

    graficarGato();

    graficarComida();

}