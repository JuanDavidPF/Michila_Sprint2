var body = document.querySelector("body");
var table = document.createElement("table");
var btnOrdenarA = document.querySelector(".btn__ordenaA");
var btnOrdenarB = document.querySelector(".btn__ordenaD");
var selecciona = document.querySelector(".selecciona");
let arregloDeLista;
let celda;
let fila;
//Cargar el archivo
$.ajax({
  url: "/baseDeDatos - Sheet2.csv",
  dataType: "text"
}).done(successFunction);

function successFunction(data) {
  //Division por saltos de linea
  //digamos que es una linea
  var datosFila = data.split("\n");
  //Arreglo donde se guarda la nueva información
  var informacion = [];
  
  for (let index = 1; index < datosFila.length; index++) {
    //Lectura de una linea
    let dataLinea = datosFila[index];
    
    //Creacion de fila Crea la tabla
    fila = document.createElement("tr");
    
    //Division por ;
    arregloDeLista = dataLinea.split(",");
    
    for (let indice = 0; indice < arregloDeLista.length; indice++) {
      //Lectura de celda
      let dataCelda = arregloDeLista[indice];
      
      celda = document.createElement("td");
      celda.innerHTML = dataCelda;
      
      fila.appendChild(celda);
    }
    
    table.appendChild(fila);
    //AQUI SE LE AGREGAN POSICIONES
    informacion.push({correo:arregloDeLista[0],participaciones:arregloDeLista[1], columnaa:arregloDeLista[2], columnab: arregloDeLista[3]});
    
    
  }
  console.log("Archivo Original");
  console.log(informacion);
  btnOrdenarA.addEventListener('click',ordenarA );
  
  btnOrdenarB.addEventListener('click',ordenarB );
  
  function ordenarA(){
    if( selecciona.value === "participaciones"){
      console.log("Participantes ordenado de forma Ascendente");
      informacion.sort(function(objetoA, objetoB)
      { 
        
        //Ordenar por ID
        return objetoA.participaciones - objetoB.participaciones;
        
        
      });
      
      console.log(informacion);

      
    }
    else if( selecciona.value === "columnaA"){
      console.log("Columna A ordenado de forma Ascendente");
      informacion.sort(function(objetoA, objetoB)
      { 
        
        //Ordenar por ID
        return objetoA.columnaa - objetoB.columnaa;
        
        
      });
      console.log(informacion);
      
      
    }
    else if( selecciona.value === "columnaB"){
      console.log("Columna B ordenado de forma Ascendente");
      informacion.sort(function(objetoA, objetoB)
      { 
        
        //Ordenar por ID
        return objetoA.columnab - objetoB.columnab;
        
        
      });
      console.log(informacion);
    }
    
  }
  
  
  function ordenarB(){
    if( selecciona.value === "participaciones"){
      console.log("Participantes ordenado de forma Descendente");
      informacion.sort(function(objetoB, objetoA)
      { 
        
        //Ordenar por ID
        
        return objetoA.participaciones - objetoB.participaciones;
        
        
      });
      
      console.log(informacion);
      
    }
    else if( selecciona.value === "columnaA"){
      console.log("Columna A ordenado de forma Descendente");
      informacion.sort(function(objetoB, objetoA)
      { 
        
        //Ordenar por ID
        return objetoA.columnaa - objetoB.columnaa;
        
        
      });
      console.log(informacion);
      
    }
    else if( selecciona.value === "columnaB"){
      console.log("Columna B ordenado de forma Descendente");
      informacion.sort(function(objetoB, objetoA)
      { 
        
        //Ordenar por ID
        return objetoA.columnab - objetoB.columnab;
        
        
      });
      console.log(informacion);
    }
    
  }
  
  
  
  body.appendChild(table);

}
