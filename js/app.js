//Contador manual
const container = document.querySelector('.container');
const digito = document.querySelector('.digito');
let contador = 0;

container.addEventListener('click', (e)=>{
    e.stopPropagation();
    console.log();
    if(e.target.classList.contains('btnAumentar')){
        contador ++;
        digito.textContent = contador;
    }
    if(e.target.classList.contains('btnDisminuir')){
        contador --;
        digito.textContent = contador;
    }
});


//Todo list
//Crear boton eliminar al final de los li
const btnAdd = document.querySelector("#boton-ingreso");
const miLista = document.querySelector(".miLista");
btnAdd.addEventListener("click", e =>{
    addNewElement();
    
});

function addNewElement(){
    let li = document.createElement("LI");//crear elemento li
    let textoCaja = document.getElementById("txt-in").value;//capturar texto usuario
    let t = document.createTextNode(textoCaja);//crear texto
    li.appendChild(t);//pasar texto al li
    if(textoCaja != ''){
        miLista.appendChild(li);
    }
}
