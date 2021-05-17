const body = document.querySelector("body");
const table = document.createElement("table");
// var btnOrdenarA = document.querySelector(".btn__ordenaA");
// var btnOrdenarB = document.querySelector(".btn__ordenaD");
// var selecciona = document.querySelector(".selecciona");
// let similitudCosenoTitleDOM = document.querySelector(".result_similitud");
let arregloDeLista;
let celda;
let fila;
let peopleSelectionMaxSize = 1;
var usersDatabase = [];
let peopleSelected = [];

const groupSize = document.querySelector(".groupSize");

//Cargar el archivo

$.ajax({
  url: "./datos-sprint3.csv",
  dataType: "text",
}).done(successFunction);

function successFunction(data) {
  //Division por saltos de linea
  //digamos que es una linea
  var datosFila = data.split("\n");
  //Arreglo donde se guarda la nueva información
  usersDatabase = [];

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

    let personData = [];

    for (let i = 1; i < arregloDeLista.length; i++) {
      personData[i - 1] = parseFloat(arregloDeLista[i]);
    }

    usersDatabase.push({
      correo: arregloDeLista[0],
      cifras: personData,
    });

    //Link click event listener to the row
    fila.addEventListener("click", (event) =>
      HandlePersonClick(usersDatabase[index - 1], event.target.parentElement)
    );
  }

  // btnOrdenarA.addEventListener("click", ordenarA);

  // btnOrdenarB.addEventListener("click", ordenarB);

  body.appendChild(table);
} //closes sucessFunction methods

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
} //closes ordenarA method

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
} //closes ordenarB method

function HandlePersonClick(personClicked, personDOM) {
  var person = {
    personData: personClicked,
    personDom: personDOM,
  };

  if (!personDOM.classList.contains("selected")) {
    personDOM.classList.add("selected");
    peopleSelected.push(person);

    if (peopleSelected.length > peopleSelectionMaxSize) {
      let oldestPersonSelected = peopleSelected.shift();
      oldestPersonSelected.personDom.classList.remove("selected");
    }
  } else {
    peopleSelected.splice(
      peopleSelected.findIndex(
        (people) => people.personData.correo === person.personData.correo
      ),
      1
    );
    personDOM.classList.remove("selected");
  }

  // if (peopleSelected.length == 2) {
  //   similitudCosenoTitleDOM.textContent =
  //     "La similitud coseno entre " +
  //     peopleSelected[0].personData.correo +
  //     " y " +
  //     peopleSelected[1].personData.correo +
  //     " es : " +
  //     SimilitudCoseno(
  //       peopleSelected[0].personData,
  //       peopleSelected[1].personData
  //     ).toFixed(2);
  // }
} //closes HandlePersonClick method

function Parchar() {
  let parche = [];

  peopleSelected.forEach((personSlected) => {
    usersDatabase.forEach((neighbour) => {
      let similitudCoseno = SimilitudCoseno(
        personSlected.personData,
        neighbour
      );

      let miembroParche = {
        name: neighbour.correo,
        similitudCoseno: similitudCoseno,
      };

      if (!parche.includes(miembroParche)) parche.push(miembroParche);
    });
  });

  //removes user selected from the parche
  peopleSelected.forEach((personSlected) => {
    parche.splice(
      parche.findIndex(
        (miembroParche) =>
          personSlected.personData.correo === miembroParche.name
      ),
      1
    );
  });

  //organizes parche based on similitud coseno
  parche.sort((miembroParche1, miembroParche2) => {
    return miembroParche2.similitudCoseno - miembroParche1.similitudCoseno;
  });

  //cuts parche size to the value the user chose
  parche.length=groupSize.value;
  
  console.log(parche);
} //closes Parchar method

function SimilitudCoseno(personA, personB) {
  let similitudCoseno = 0;

  personA = JSON.parse(JSON.stringify(personA));
  personB = JSON.parse(JSON.stringify(personB));

  let productoPunto = ProductoPunto(personA, personB);
  let magnitudA = Magnitud(personA);
  let magnitudB = Magnitud(personB);

  similitudCoseno = productoPunto / (magnitudA * magnitudB);
  return similitudCoseno;
} //closes SimilitudCoseno method

function ProductoPunto(ArrayA, ArrayB) {
  let producto = 0;

  for (let i = 0; i < ArrayA.cifras.length; i++) {
    producto += ArrayA.cifras[i] * ArrayB.cifras[i];
  }

  return producto;
} //closes ProductoPunto method

function Magnitud(Array) {
  let magnitud = 0;

  for (let i = 0; i < Array.cifras.length; i++) {
    magnitud += Math.pow(Array.cifras[i], 2);
  }

  magnitud = Math.sqrt(magnitud);
  return magnitud;
} //closes Magnitud method
