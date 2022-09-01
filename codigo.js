let encriptar=document.querySelector("#BtnEncriptar");
let TextoAEncriptar=document.querySelector("#TextoAEncriptar");
let TextoEncriptado=document.querySelector(".TextoEncriptado");
let muneco=document.querySelector(".muneco");
let mensajes=document.querySelector(".mensajes");
let desencriptar=document.querySelector("#BtnDesencriptar");
let BtnCopiar=document.querySelector("#BtnCopiar");
let opacidad=1;
let tiempo;
let TextoEncriptado2=document.querySelector(".TextoEncriptado2");


encriptar.addEventListener("click",conversion);

desencriptar.addEventListener("click",Fdesencriptar);

BtnCopiar.addEventListener("click",CopiarTexto);


function sololetras(event){
    let keyValue = event.key;
    let codeValue = event.keyCode;
    let letras="áéíóúABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (letras.indexOf(keyValue) != -1) {
        alert("Solo letras minusculas y sin acentos");
        return false;
    }

}




function conversion(){

    let texto=TextoAEncriptar.value;

    if(texto!=""){
        let nuevoTexto="";
        for(let letra of texto){
            
            if(letra=="a"){
                nuevoTexto=nuevoTexto+"ai";
                continue;
            }
            if(letra=="e"){
                nuevoTexto=nuevoTexto+"enter";
                continue;
            }
            if(letra=="i"){
                nuevoTexto=nuevoTexto+"imes";
                continue;
            }
            if(letra=="o"){
                nuevoTexto=nuevoTexto+"ober";
                continue;
            }
            if(letra=="u"){
                nuevoTexto=nuevoTexto+"ufat";
                continue;
            }else{
                nuevoTexto=nuevoTexto+letra;
            }
            
        }
        
        AnimacionDesaparecer(muneco,mensajes);
        
        //animacion aparecer el text encriptado
        TextoEncriptado.style.animationName = "desaparecer";
        TextoEncriptado.style.animationDuration = "0.6s";
        TextoEncriptado.style.animationDirection= "reverse";
        TextoEncriptado.innerHTML=nuevoTexto;  
        
        //aparecer el boto copiar con animacion
        BtnCopiar.style.animationName="desaparecer";
        BtnCopiar.style.animationDuration = "0.6s";
        BtnCopiar.style.animationDirection= "reverse";
        BtnCopiar.style.animationFillMode="forwards";

        TextoAEncriptar.value="";


    }else{
        tiempo=setInterval (FuncionParpadear, 250);
        setTimeout(FuncionPararParpadeo,1500);
    }

    
}

function FuncionParpadear(){
    
        opacidad = (opacidad ==1)? 0 : 1;
        mensajes.style.opacity = opacidad;
    
}

function FuncionPararParpadeo(){
    opacidad=1;
    clearInterval(tiempo);
}

function AnimacionDesaparecer(mun,men){

    //para desaparecer por medio de opacidad el muñeco
    mun.style.animationName = "desaparecer";
    mun.style.animationDuration = "0.6s";
    mun.style.animationFillMode="forwards";

    //para desaparecer por medio de opacidad los textos
    men.style.animationName = "desaparecer";
    men.style.animationDuration = "0.6s";
    men.style.animationFillMode="forwards";

}

function Fdesencriptar(){
    let texto=TextoAEncriptar.value;

    if(texto!=""){
        let LargoTexto=texto.length;
        let otrotexto="";

        otrotexto=texto.replaceAll('ai','a');
        otrotexto=otrotexto.replaceAll('enter','e');
        otrotexto=otrotexto.replaceAll('imes','i');
        otrotexto=otrotexto.replaceAll('ober','o');
        otrotexto=otrotexto.replaceAll('ufat','u');

        
        // for(let i=0; i<LargoTexto; i++){
        //     if(texto[i]=="a" && texto[i+1]=="i"){
        //         otrotexto=otrotexto+"a";
        //         i=i+1;
        //         continue;
        //     }
        //     if(texto[i]=="e" && texto[i+1]=="n" && texto[i+2]=="t" && texto[i+3]=="e" && texto[i+4]=="r"){
        //         otrotexto=otrotexto+"e";
        //         i=i+4;
        //         continue;
        //     }
        //     if(texto[i]=="i" && texto[i+1]=="m" && texto[i+2]=="e" && texto[i+3]=="s"){
        //         otrotexto=otrotexto+"i";
        //         i=i+3;
        //         continue;
        //     }
        //     if(texto[i]=="o" && texto[i+1]=="b" && texto[i+2]=="e" && texto[i+3]=="r"){
        //         otrotexto=otrotexto+"o";
        //         i=i+3;
        //         continue;
        //     }
        //     if(texto[i]=="u" && texto[i+1]=="f" && texto[i+2]=="a" && texto[i+3]=="t"){
        //         otrotexto=otrotexto+"u";
        //         i=i+3;
        //         continue;
        //     }
            
        //     else{
        //         otrotexto=otrotexto+texto[i];
        //     }
        // }

        AnimacionDesaparecer(muneco,mensajes);
        
        //animacion aparecer el text encriptado
        TextoEncriptado.style.animationName = "desaparecer";
        TextoEncriptado.style.animationDuration = "0.6s";
        TextoEncriptado.style.animationDirection= "reverse";
        TextoEncriptado.innerHTML=otrotexto;  

        TextoAEncriptar.value="";
    } 

}

function CopiarTexto(){
    TextoEncriptado.select();
    document.execCommand("copy");
}