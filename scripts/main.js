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

// Defino la class Task
class Task {
    constructor(task, days, firstResponsible, secondResponsible) {
        this.task = task;
        this.days = days;
        this.date = new Date();
        this.done = false;
        this.firstResponsible = firstResponsible;
        this.secondResponsible = secondResponsible;
    }
    toString = () => {
        return this.task;
    };
}

// Función para la carga de las distintas tareas pendientes del usuario.
function taskAdd() {
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
    return new Task(task, days, firstResponsible, secondResponsible);
}

// Función para chequear si el usuario quiere continuar con la carga de tareas.
function continueAdding() {
    let carryOn = "";
    let count = 0;
    do {
        if (count > 0 && carryOn.toUpperCase().trim() !== "Y" && carryOn.toUpperCase().trim() !== "N") {
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
let taskArray = []; // Vieja funcionalidad para las primera 2 pre-entregas
let tasksArray = []; // Para la nueva funcionalidad con DOM
const newTaskForm = document.getElementById("add-new-task");

showTasks();

// Recibo la información del formulario para una nueva tarea
newTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newTask();
    showTasks();
    closeModal();
    newTaskForm.reset();
});

// Creo la funcion para crear la nueva tarea
function newTask() {
    const task = document.getElementById("task").value;
    const days = document.getElementById("days").value;
    tasksArray.push(new Task(task, days, "Santiago", "Curat"));
}

// Creo la funcion para mostrar el listado de tareas
function showTasks() {
    const table = document.getElementById("task-elements");
    table.innerHTML = "";
    if (tasksArray.length >= 1) {
        tasksArray.forEach((task) => {
            let record = document.createElement("tr");
            record.innerHTML = `<td>${task["task"]}</td>
                                <td>${task["date"].toJSON().slice(0, 10)}</td>
                                <td>${task["days"]}</td>
                                <td>
                                    <div class="task-options">
                                        <img src="./multimedia/done.png" alt="completar tarea" />
                                        <img src="./multimedia/edit.png" alt="editar tarea" />
                                        <img src="./multimedia/delete.png" alt="eliminar tarea" />
                                    </div>
                                </td>`;
            table.append(record);
        });
    } else {
        let record = document.createElement("tr");
        record.innerHTML = '<td colspan="4">Todavía no tiene tareas cargadas</td>';
        table.append(record);
    }
}

do {
    let task = taskAdd();
    taskArray.push(task);
    console.log(
        "Tarea N°" +
            (count + 1) +
            " -> " +
            task["task"] +
            " -> Fecha de carga: " +
            task["date"].toJSON().slice(0, 10) +
            " -> " +
            task["days"] +
            " días para completarla -> Sus responsables son: " +
            task["firstResponsible"] +
            " y " +
            task["secondResponsible"]
    );
    count++;
} while (continueAdding());

// Le mostramos cuantas tareas fueron cargadas.
alert("Se han cargado " + count + " tareas.");

// Le mostramos el total de días de las tareas cargadas
alert("El total de días necesarios para cumplir con las tareas cargadas es de " + taskArray.reduce((sum, task) => sum + task["days"], 0));

// Ordenamos el array según los días de manera decreciente
taskArray.sort((a, b) => b["days"] - a["days"]);
console.log("Tareas ordenadas por días decrecientemente:");
taskArray.forEach((task) => {
    console.log(`${task["task"]} -> Fecha de carga: ${task["date"].toJSON().slice(0, 10)} -> ${task["days"]} días -> Sus responsables son: ${task["firstResponsible"]} y ${task["secondResponsible"]}`);
});
