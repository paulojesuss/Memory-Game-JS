var nome = document.getElementById("nome");
var btnEntrar = document.getElementById("btnEntrar");
function entrar(){
    if(nome.value.length>0){
        btnEntrar.removeAttribute("disabled");
        btnEntrar.style.cursor="pointer";
    }else{
        btnEntrar.setAttribute("disabled", "");
        btnEntrar.style.cursor = "auto";
    }  
}
var formulario = document.getElementById("formulario");
function enviar(){
    this.event.preventDefault();
    localStorage.setItem('nome', nome.value);
    window.location = "index.html";
}

function sobre(){
    this.event.preventDefault();
    window.location = "sobre.html";
}
    