var pantalla = document.querySelector("canvas"); //variable de pagina "juego"
let PalAAgregar=document.getElementById("palabra"); //variable de la pagina agregar, palabra nueva

//Variable Globales

let escucharTecla = true;
let VecLetras = "";
let ContAciertos = 0;
let PalabraE;

//Esta funcion "selector()" es el onclick del primer boton inciar juego de la pagina "Principal"
function selector(){
    sessionStorage.setItem("SeleDpalabra",1);
    window.location.href="juego.html";
}

//esta funcion "otro" es llamada de la pagina "Principal" en el onclick del boton
//con id BtnAgregar y texto=Agregar nueva palabra
function otro(){
    sessionStorage.setItem("SeleDpalabra",2);
    
}

function Agregar_palabra(){
    if(PalAAgregar.value.length<2){
        alert("Palabra no valida");
    }else{
        sessionStorage.setItem("Agregar_palabra",PalAAgregar.value);
        window.location.href="juego.html";
    }
    
}

//********************************Segunda pagina, pagina "juego"*******************************************//

//-----------------El tablero donde se dibuja---------------------------//
//dibujando la pizarra con sus variables para poder dibujar//

// Este if detecta si existe la variable pantalla y si existe, es decier si existe "canvas"
// entra al if, el canvas solo existe en la pagina juego, esto es para evitar errores con el 
// addeventlistener
if(pantalla){

    let Noletras = document.getElementById("NoLetras"); //div que contiene las letras que no son de la palabra
    let mensaje = document.getElementById("mensaje");
    var pincel = pantalla.getContext("2d");
    pincel.fillStyle = "#E5E5E5";
    pincel.fillRect(0, 0, 400, 350);

    var x;
    var y;
    var TempDi1;
    var ContError = 0;
    var sentido = -1;


    pincel.beginPath();
    pincel.moveTo(95, 320);
    pincel.lineWidth = 5;
    pincel.lineTo(270, 320);
    pincel.strokeStyle = "blue";
    pincel.stroke();

    function trazo(x, y, radio) {
        pincel.fillStyle = "blue";
        pincel.beginPath();
        pincel.arc(x, y, radio, 0, 2 * Math.PI);
        pincel.fill();
    }

    function dibujo1() {
        trazo(100, y, 3);

        y = y - 1;
        if (y == 100) {
            clearInterval(TempDi1);
            escucharTecla = true;
        }
    }

    function dibujo2() {
        trazo(x, 100, 3);

        x++;
        if (x == 205) {
            clearInterval(TempDi1);
            escucharTecla = true;
        }
    }

    function dibujo3() {
        trazo(205, y, 3);

        y++;
        if (y == 130) {
            clearInterval(TempDi1);
            escucharTecla = true;
        }
    }


    function cabeza() {

        if (y == 130) {
            sentido = 1;
        }

        x = (Math.sqrt(Math.pow(20, 2) - Math.pow((y - 150), 2)) + (205 * (-1 * sentido))) * (-1 * sentido);

        trazo(x, y, 3);

        if (sentido == 1 & y == 170) {
            clearInterval(TempDi1);
            escucharTecla = true;
        }

        y = y + sentido;


    }

    function cuerpo() {

        trazo(205, y, 3);
        y++;
        if (y == 235) {
            clearInterval(TempDi1);
            escucharTecla = true;
        }

    }

    function pieD() {
        trazo(x, y, 3);
        y++;
        x++;
        if (y == 265) {
            clearInterval(TempDi1);
            escucharTecla = true;
        }

    }

    function pieI() {
        trazo(x, y, 3);
        y++;
        x--;
        if (y == 265) {
            clearInterval(TempDi1);
            escucharTecla = true;
        }

    }

    function BrazoD() {
        trazo(x, y, 3);
        y++;
        x++;
        if (y == 200) {
            clearInterval(TempDi1);
            escucharTecla = true;
        }

    }

    function BrazoI() {
        trazo(x, y, 3);
        y++;
        x--;
        if (y == 200) {

            clearInterval(TempDi1);
            mensaje.innerHTML = "Perdiste, la palabra era <br>" + palabras[PosiPalabra].toUpperCase();
        }

    }

    //----------------Se termina el dibujo--------------------------------//


    let palabras = ["colombia", "rinoceronte", "america", "metodologia", "ornitorrinco", "procesos", "trabajo", "futbol", "computador", "teclado", "codigo", "algoritmo"]
    let TamaVector = palabras.length - 1;
    let PosiPalabra = Math.round((Math.random() * TamaVector));

    if(sessionStorage.getItem("SeleDpalabra")==1 || sessionStorage.getItem("SeleDpalabra")==null){
        PalabraE=palabras[PosiPalabra];

    }

    if(sessionStorage.getItem("SeleDpalabra")==2){
        PalabraE=sessionStorage.getItem("Agregar_palabra");
        palabras.push(PalabraE);

    }

        

    let table = document.createElement('table');//nombre de la tabla
    let thead = document.createElement('thead');//Encabezado de la tabla con su parametro th
    //let tbody = document.createElement('tbody');
    //no usuo el el cuerpo de la tabla (tbody) ya que solo necestio
    //una fila para este ejercicio, con tbody se usa el parametro td



    table.appendChild(thead);//para agregar el encabezado a la tabla
    //table.appendChild(tbody); no lo estoy usando


    // agregado la tabla "table" en el div con id=letras
    document.getElementById('letras').appendChild(table);

    let fila1 = document.createElement('tr'); //creo la unica fila

    //con el for coloco las celdas de acuerdo al tamaño de la palabra
    //y solo pinto el borde inferior desde el CSS con el selector th
    for (i = 0; i < PalabraE.length; i++) {
        let encabezado = "encabezado" + i;
        encabezado = document.createElement('th');
        // encabezado.innerHTML = ""; 

        fila1.appendChild(encabezado);
    }


    thead.appendChild(fila1);

    
    //esta pendiente de cualquier tecla que se presione
    document.addEventListener('keydown', (event) => {

        // escucharTecla es para desabilitar la escucha de teclas mientras se dibuja con el temporizador
        if (escucharTecla) {
            let teclaPresionada = event.key;
            let letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            if (letras.indexOf(teclaPresionada.toUpperCase()) != -1) {
                let teclaPresionada = event.key;
                let letraEncontrada = false;

                for (let i = 0; i < PalabraE.length; i++) {
                    if (teclaPresionada == PalabraE[i]) {
                        table.rows[0].cells[i].innerText = teclaPresionada.toUpperCase();
                        letraEncontrada = true;
                        ContAciertos++;
                    }
                    if (ContAciertos == PalabraE.length) {
                        mensaje.innerHTML = "Felicidades, Ganaste";

                    }
                }

                if (!letraEncontrada) {
                    if (!VecLetras.includes(teclaPresionada.toUpperCase())) {
                        VecLetras = VecLetras + " " + teclaPresionada.toUpperCase();
                        Noletras.innerHTML = VecLetras;
                    }

                    ContError++;
                    if (ContError == 1) {
                        y = 320;
                        escucharTecla = false;
                        TempDi1 = setInterval(dibujo1, 7);
                    }
                    if (ContError == 2) {
                        escucharTecla = false;
                        x = 100;
                        TempDi1 = setInterval(dibujo2, 10);
                    }
                    if (ContError == 3) {
                        escucharTecla = false;
                        y = 100;
                        TempDi1 = setInterval(dibujo3, 10);
                    }
                    if (ContError == 4) {
                        escucharTecla = false;
                        y = 170;
                        TempDi1 = setInterval(cabeza, 20);
                    }

                    if (ContError == 5) {
                        escucharTecla = false;
                        y = 170;
                        TempDi1 = setInterval(cuerpo, 20);
                    }

                    if (ContError == 6) {
                        escucharTecla = false;
                        x = 205;
                        y = 235;
                        TempDi1 = setInterval(pieD, 20);
                    }

                    if (ContError == 7) {
                        escucharTecla = false;
                        x = 205;
                        y = 235;
                        TempDi1 = setInterval(pieI, 20);
                    }

                    if (ContError == 8) {
                        escucharTecla = false;
                        x = 205;
                        y = 170;
                        TempDi1 = setInterval(BrazoD, 20);
                    }

                    if (ContError == 9) {
                        escucharTecla = false;
                        x = 205;
                        y = 170;
                        TempDi1 = setInterval(BrazoI, 20);
                    }

                }

            } else {
                alert("Tecla no valida");
            }


        }

    }, false);

}
//****************************Termina Segunda pagina pagina "juego"****************************************//