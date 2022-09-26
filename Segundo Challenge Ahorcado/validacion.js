function sololetras(event){
    let keyValue = event.key;
    let codeValue = event.keyCode;
    let letras="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (letras.indexOf(keyValue.toUpperCase()) == -1) {
        alert("Tecla no permitida");
        return false;
    }
}