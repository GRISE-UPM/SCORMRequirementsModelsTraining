
var procesos = localStorage.getItem("procesos_sel");
var entidades = localStorage.getItem("entidades_sel");
var flujos = localStorage.getItem("flujos_sel");
var almacenes = localStorage.getItem("almacenes_sel");
j = 1;


arrp = JSON.parse(procesos);
arre = JSON.parse(entidades);
arrf = JSON.parse(flujos);
arra = JSON.parse(almacenes);

if(!localStorage.getItem("relaciones_sel") || !localStorage.getItem("relaciones_obj")){ 
relaciones_obj = [];
relaciones_str = [];
}
else{
    var rel = localStorage.getItem("relaciones_sel");
    var relObj = localStorage.getItem("relaciones_obj");
    relaciones_str = JSON.parse(rel);
    relaciones_obj = JSON.parse(relObj);
    for(i = 0;i<relaciones_str.length;i++){
        devolverBotones(relaciones_str[i],document.getElementById("botones_r"),relaciones_str);
    }
}
const relacion = {
    at:"defecto",
    tipoat:"defecto",
    flujo: "defecto",
    at2: "defecto",
    tipoat2: "defecto"
};

for(var i=0; i<arrp.length ; i++){
    botones_At(arrp[i],"proceso",document.getElementById("botones_p"));
}
for(var i=0; i<arre.length ; i++){
    botones_At(arre[i],"entidad",document.getElementById("botones_e"));
}
for(var i=0; i<arrf.length ; i++){
    botones_At(arrf[i],"flujo",document.getElementById("botones_f"));
}
for(var i=0; i<arra.length ; i++){
    botones_At(arra[i],"almacen",document.getElementById("botones_a"));
}

function clearRel()
{
    j = 1;
    clearSecondRow();
}

function botones_At(atributo,tipo,id){
    var bodyp = id;
    var x = document.createElement("button");
    x.innerHTML = atributo;
    if(tipo!="flujo"){ 
    x.onclick = function(){
        if(j==1){
            relacion.at = atributo;
            relacion.tipoat = tipo;
            j++;
            agregarElemento(atributo);
        }
        else if(j==2){
            alert("First select the flow of the relation");
        }
        else{
            relacion.at2 = atributo;
            relacion.tipoat2 = tipo;
            añadir_obj(relacion);
            agregarElemento(atributo);
            var rel = relacion.at + "---" + relacion.flujo + "--->" + relacion.at2;
            relaciones_str.push(rel);
            var bodyr = document.getElementById("botones_r");
            var y = document.createElement("button");
            y.innerHTML = rel;
            y.onclick = function(){
                for(var k=0; k<relaciones_str.length; k++ ){
                    if(relaciones_str[k] == rel){
                        relaciones_str.splice(k,1);
                        relaciones_obj.splice(k,1);
                        break;
                    }
                }
                bodyr.removeChild(y);
            }
            bodyr.appendChild(y);
            j=1;
            clearSecondRow();
        }
    }
    }
    else{
        x.onclick = function(){
            if(j==1){
                alert("Select the firs argument of the relations, wheter it is a entity or a depot");
            }
            else if (j==2){
                relacion.flujo = atributo;
                j++;
                agregarElemento(atributo)
            }
            else{
                alert("A flow have been already selected");
            }
        }
    }
    bodyp.appendChild(x);
}

function boton(pagina){
    localStorage.setItem("relaciones_sel", JSON.stringify(relaciones_str));
    localStorage.setItem("relaciones_obj", JSON.stringify(relaciones_obj));
    if(pagina=='anterior'){
        window.location = "atributosTexto.html";
    }
    else if(pagina=='siguiente'){
        window.location = "modeloProvisional.html";
    }
}

function devolverBotones(obj,body,arr){
    var x = document.createElement("button");
    x.innerHTML = obj;
    x.onclick = function(){
          for(var l=0; l<arr.length; l++ ){
              if(arr[l] == obj){
                  arr.splice(l,1);
                  relaciones_obj.splice(l,1);
                  break;
              }
          }
          body.removeChild(x);
        }
    body.appendChild(x);
}

function añadir_obj(relacion){
    var solucion = new Object();
    solucion.at = relacion.at;
    solucion.at2 = relacion.at2;
    solucion.flujo = relacion.flujo;
    solucion.tipoat = relacion.tipoat;
    solucion.tipoat2 = relacion.tipoat2;
    relaciones_obj.push(solucion);
}

function clearSecondRow() {
    var secondRow = document.getElementById("secondRow");
    var cells = secondRow.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerHTML = "";
    }
  }

  function agregarElemento(element) {
    var table = document.getElementById("tabla");
    var rows = table.rows;
    for (var i = 0; i < rows.length; i++) {
      if (i === 1) { // solo la segunda fila
        var cells = rows[i].cells;
        for (var j = 0; j < cells.length; j++) {
          var cell = cells[j];
          if (cell.innerHTML === "") { // si la celda está vacía
            cell.innerHTML = element;
            return;
          }
        }
      }
    }
  }