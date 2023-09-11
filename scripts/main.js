/* Archivo de código principal.
Contiene las principales funcionalidades del proyecto. */

// Función para asegurarme que los strings agregados sean válidos.
function stringCheck(type) {
    let name;
    do {
        if (name === "") {
            alert("Por favor ingrese un valor válido!");
        }
        name = prompt("Ingrese su " + type + ":");
    } while (name.trim() === "");
    return name.trim();
}

// Función para asegurarme que los días de las tareas sean válidos.
function daysCheck() {
    let days = 0;
    do {
        if (days < 0 || isNaN(parseInt(days))) {
            alert("Por favor ingrese una cantidad válida!");
        }
        days = prompt("Ingrese la cantidad de días estimados:");
    } while (parseInt(days) < 0 || isNaN(parseInt(days)));
    return parseInt(days);
}

// Función para la carga de las distintas tareas pendientes del usuario.
function taskAdd() {
    const TODAY = new Date().toJSON().slice(0, 10);
    let task = stringCheck("tarea");
    let days = daysCheck();
    let firstResponsible, secondResponsible;
    for (let i = 1; i <= 2; i++) {
        if (i === 1) {
            firstResponsible = prompt("Ingrese el nombre del responsable N°" + i).trim();
        } else {
            secondResponsible = prompt("Ingrese el nombre del responsable N°" + i).trim();
        }
    }
    return task + " -> Fecha de carga: " + TODAY + " -> " + days + " días para completarla -> Sus responsables son: " + firstResponsible + " y " + secondResponsible;
}

// Función para chequear si el usuario quiere continuar con la carga de tareas.
function continueAdding() {
    let carryOn = "";
    let count = 0;
    do {
        if ((count > 0) & (carryOn.toUpperCase().trim() !== "Y") && carryOn.toUpperCase().trim() !== "N") {
            alert("Por favor ingrese una opción válida!");
        }
        carryOn = prompt("¿Desea continuar cargando tareas? (Y/N):");
        count++;
    } while (carryOn.toUpperCase().trim() !== "Y" && carryOn.toUpperCase().trim() !== "N");
    return carryOn.toUpperCase().trim() === "Y";
}

/* Aquí comienza la parte principal del código. 
Comenzamos pidiendo el nombre y apellido del usuario.*/
let firstName = stringCheck("Nombre");
let lastName = stringCheck("Apellido");

console.log("Bienvenido " + firstName + " " + lastName + "!");

// El usuario debe tener la opcion de cargar múltiples tareas.
let count = 0;
let keepAdding = true;

do {
    console.log("Tarea N°" + (count + 1) + " -> " + taskAdd());
    count++;
} while (continueAdding());

// Le mostramos cuantas tareas fueron cargadas.
alert("Se han cargado " + count + " tareas.");
