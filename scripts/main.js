/* Archivo de código principal.
Contiene las principales funcionalidades del proyecto. */

// Defino la class Task
class Task {
    constructor(id, task, days, date = null, done = false, end = null) {
        this.id = parseInt(id);
        this.task = task;
        this.days = parseInt(days);
        this.date = date ? new Date(date) : new Date();
        this.done = done;
        this.end = end ? new Date(end) : null;
    }
    toString = () => {
        return this.task;
    };
    editTask(task, days) {
        this.task = task;
        this.days = parseInt(days);
    }
}

// Creo la funcion para mostrar el listado de tareas pendientes
function showPendingTasks() {
    const table = document.getElementById("task-elements");
    table.innerHTML = "";
    const pendingArray = tasksArray.filter((task) => task["done"] === false);
    if (pendingArray.length >= 1) {
        pendingArray.forEach((task) => {
            let record = document.createElement("tr");
            record.setAttribute("id", `task-${task["id"]}`);
            record.innerHTML = `<td>${task["task"]}</td>
                                <td>${task["date"].toJSON().slice(0, 10)}</td>
                                <td>${task["days"]}</td>
                                <td>
                                    <div class="task-options">
                                        <img src="./multimedia/done.png" alt="completar tarea" onclick="completeTask(${task["id"]})"/>
                                        <img src="./multimedia/edit.png" alt="editar tarea" onclick="editModal(${task["id"]})"/>
                                        <img src="./multimedia/delete.png" alt="eliminar tarea" onclick="deleteTask(${task["id"]})"/>
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

// Creo la funcion para mostrar el listado de tareas completas
function showCompletedTasks() {
    const table = document.getElementById("completed-task-elements");
    table.innerHTML = "";
    const completedArray = tasksArray.filter((task) => task["done"] === true);
    if (completedArray.length >= 1) {
        completedArray.forEach((task) => {
            const record = document.createElement("tr");
            const diffDays = (task["end"] - task["date"]) / (1000 * 60 * 60 * 24);
            record.setAttribute("id", `task-${task["id"]}`);
            record.innerHTML = `<td>${task["task"]}</td>
                                <td>${task["date"].toJSON().slice(0, 10)}</td>
                                <td>${task["end"].toJSON().slice(0, 10)}</td>
                                <td>${diffDays.toFixed(2)}</td>`;
            table.append(record);
        });
    } else {
        const record = document.createElement("tr");
        record.innerHTML = '<td colspan="4">Todavía no tiene tareas completadas</td>';
        table.append(record);
    }
}

// Creo la funcion para crear la nueva tarea
function newTask() {
    const task = document.getElementById("task").value;
    const days = document.getElementById("days").value;
    let id =
        tasksArray.length > 0
            ? Math.max(
                  ...tasksArray.map((task) => {
                      return task["id"];
                  })
              ) + 1
            : 0;
    tasksArray.push(new Task(id, task, days));
    saveLocal(TASKS_LOCAL_STORAGE, JSON.stringify(tasksArray));
}

// Creo la funcion para guardar las tareas en localStorage
const saveLocal = (key, value) => {
    localStorage.setItem(key, value);
};

const newTaskForm = document.getElementById("add-new-task");

newTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newTask();
    sortTasks();
    showPendingTasks();
    closeModal();
    newTaskForm.reset();
});

// Intento de conseguir tareas almacenadas en localStorage, de lo contrario, cargo las del mock
const RELATIVE_URL = "mocks/tasks.json";
const TASKS_LOCAL_STORAGE = "storedTasks";
const tasksArray = [];

function unhideSpinners() {
    const spinners = document.querySelectorAll(".loading-spinner");
    spinners.forEach((spinner) => {
        spinner.classList.remove("hidden");
    });
}

function hideSpinners() {
    const spinners = document.querySelectorAll(".loading-spinner");
    spinners.forEach((spinner) => {
        spinner.classList.add("hidden");
    });
}

async function firstRender() {
    unhideSpinners();
    const storedTasks = await JSON.parse(localStorage.getItem(TASKS_LOCAL_STORAGE));
    if (storedTasks) {
        storedTasks.forEach((task) => {
            tasksArray.push(new Task(task["id"], task["task"], task["days"], task["date"], task["done"], task["end"]));
        });
        hideSpinners();
    } else {
        await fetch(RELATIVE_URL)
            .then(async (response) => await response.json())
            .then(async (tasks) => {
                await tasks.forEach((task) => {
                    tasksArray.push(new Task(task["id"], task["task"], task["days"], task["date"], task["done"], task["end"]));
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron recuperar las tareas cargadas!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .finally(() => {
                hideSpinners();
            });
    }
    showPendingTasks();
    showCompletedTasks();
}

firstRender();
