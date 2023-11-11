// Aquí tengo la lógica para las distintas opciones

function completeTask(id) {
    Swal.fire({
        title: "Seguro?",
        text: "No podrá deshacer una tarea completada!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Completar",
    }).then((result) => {
        if (result.isConfirmed) {
            const index = tasksArray
                .map((task) => {
                    return task["id"];
                })
                .indexOf(id);
            tasksArray[index]["done"] = true;
            tasksArray[index]["end"] = new Date();
            saveLocal(TASKS_LOCAL_STORAGE, JSON.stringify(tasksArray));
            showPendingTasks();
            showCompletedTasks();
            Swal.fire({
                title: "Tarea completada!",
                icon: "success",
                text: "La tarea ha sido completada con éxito!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
}

function deleteTask(id) {
    Swal.fire({
        title: "Seguro?",
        text: "No podrá recuperar la tarea eliminada!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Eliminar",
    }).then((result) => {
        if (result.isConfirmed) {
            const index = tasksArray
                .map((task) => {
                    return task["id"];
                })
                .indexOf(id);
            tasksArray.splice(index, 1);
            saveLocal(TASKS_LOCAL_STORAGE, JSON.stringify(tasksArray));
            showPendingTasks();
            Swal.fire({
                title: "Tarea eliminada!",
                icon: "success",
                text: "La tarea ha sido eliminada con éxito!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
}

function editModal(id) {
    const modal = document.querySelector(".edit-task-modal");
    const editTaskForm = document.getElementById("edit-task");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    editTaskForm.className = id;
}

const editTaskForm = document.getElementById("edit-task");

editTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = parseInt(event.target.classList[0]);
    editTask(id);
    closeModal();
    newTaskForm.reset();
});

function editTask(id) {
    const task = document.getElementById("changed-task").value;
    const days = document.getElementById("changed-days").value;
    Swal.fire({
        title: "Seguro?",
        text: "No podrá recuperar la tarea editada!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Editar",
    }).then((result) => {
        if (result.isConfirmed) {
            const index = tasksArray
                .map((task) => {
                    return task["id"];
                })
                .indexOf(id);
            tasksArray[index].editTask(task, days);
            saveLocal(TASKS_LOCAL_STORAGE, JSON.stringify(tasksArray));
            showPendingTasks();
            Swal.fire({
                title: "Tarea editada!",
                icon: "success",
                text: "La tarea ha sido editada con éxito!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
}
