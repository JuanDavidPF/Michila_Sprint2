var body = document.querySelector("body");
var table = document.createElement("table");
var btnOrdenarA = document.querySelector(".btn__ordenaA");
var btnOrdenarB = document.querySelector(".btn__ordenaD");
var selecciona = document.querySelector(".selecciona");
let arregloDeLista;
let celda;
let fila;

let peopleSelected = [];

//Cargar el archivo

$.ajax({
  url: "./datos_sprint2.csv",
  dataType: "text",
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
    informacion.push({
      correo: arregloDeLista[0],
      participaciones: arregloDeLista[1],
      columnaa: arregloDeLista[2],
      columnab: arregloDeLista[3],
    });

    //Link click event listener to the row
    fila.addEventListener("click", (event) =>
      HandlePersonClick(informacion[index - 1], event.target.parentElement)
    );
  }

  btnOrdenarA.addEventListener("click", ordenarA);

  btnOrdenarB.addEventListener("click", ordenarB);

  function ordenarA() {
    if (selecciona.value === "participaciones") {
      informacion.sort(function (objetoA, objetoB) {
        //Ordenar por ID
        return objetoA.participaciones - objetoB.participaciones;
      });
    } else if (selecciona.value === "columnaA") {
      informacion.sort(function (objetoA, objetoB) {
        //Ordenar por ID
        return objetoA.columnaa - objetoB.columnaa;
      });
    } else if (selecciona.value === "columnaB") {
      informacion.sort(function (objetoA, objetoB) {
        //Ordenar por ID
        return objetoA.columnab - objetoB.columnab;
      });
    }
  }

  function ordenarB() {
    if (selecciona.value === "participaciones") {
      informacion.sort(function (objetoB, objetoA) {
        //Ordenar por ID

        return objetoA.participaciones - objetoB.participaciones;
      });
    } else if (selecciona.value === "columnaA") {
      informacion.sort(function (objetoB, objetoA) {
        //Ordenar por ID
        return objetoA.columnaa - objetoB.columnaa;
      });
    } else if (selecciona.value === "columnaB") {
      informacion.sort(function (objetoB, objetoA) {
        //Ordenar por ID
        return objetoA.columnab - objetoB.columnab;
      });
    }
  }

  function HandlePersonClick(personClicked, personDOM) {
    let person = {
      personData: personClicked,
      personDom: personDOM,
    };

    if (peopleSelected.length == 2) {
      let oldestPerson = peopleSelected.shift();
      oldestPerson.personDom.classList.remove("selected");
    }

    personDOM.classList.add("selected");
    peopleSelected.push(person);

    if (peopleSelected.length == 2)
      SimilitudCoseno(
        peopleSelected[0].personData,
        peopleSelected[1].personData
      );
  } //closes HandlePersonClick method

  function SimilitudCoseno(personA, personB) {
    console.log(personA + ", " + personB);
  } //closes SimilitudCoseno method

  body.appendChild(table);
} //closes sucessFunction method
