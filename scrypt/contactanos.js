'use strict'

let cliente  = [];

class datosCliente {
    constructor(idNombreC,idEmailC,idAsuntoC,idMensajeC){
        this.idNombreC = idNombreC;
        this.idEmailC = idEmailC;
        this.idAsuntoC = idAsuntoC;
        this.idMensajeC = idMensajeC;
    }
}

// funcion para validar los datos

function validarCamposC () {
    if(document.getElementById('idNombreC').value == ""){
        alert('debe ingresar el nombre');
        return false;
    }
    if(document.getElementById('idEmailC').value == ""){
        alert('debe ingresar el correo');
        return false;
    }
    if(document.getElementById('idAsuntoC').value == ""){
        alert ('seleccione una opcion');
        return false;
    }
    if(document.getElementById('idMensajeC').value == ""){
        alert('escriba el mensaje');
        return false;
    }
    return true;

}

// funcion para poblar el arreglo

function poblarArregloC(){

    let idNombreC = document.getElementById('idNombreC').value;
    let idEmailC = document.getElementById('idEmailC').value;
    let idAsuntoC = document.getElementById('idAsuntoC').value;
    let idMensajeC = document.getElementById('idMensajeC').value;

   cliente.push(new datosCliente(idNombreC,idEmailC,idAsuntoC, idMensajeC));

}

// mostrer datos 

function mostrarDatosC (){
    let row = "";

    for (let index = 0; index < cliente.length; index++) {
       
        row +='<tr>'
        row += '<td>' + cliente[index].idNombreC +  '</td>'
        row += '<td>' + cliente[index].idEmailC +'</td>'
        row += '<td>' + cliente[index].idAsuntoC +'</td>'
        row += '<td>' + cliente[index].idMensajeC + '</td>'
        row +='</tr>'
    }

    document.getElementById('listadoClientes').innerHTML = row
}

//funcion principal
function agregarDatosC(){

    //validar campos
   

    if(validarCamposC()== false){
        return;
    }
   
    //poblar arreglo
    poblarArregloC();

   
    //mostare datos
    mostrarDatosC();



    alert(' agregados correctamente...');
    
}
