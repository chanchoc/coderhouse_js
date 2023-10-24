// Aquí tengo la lógica para las distintas opciones

function completeTask(id) {
    const index = tasksArray
        .map((task) => {
            return task["id"];
        })
        .indexOf(id);
    tasksArray[index]["done"] = true;
    tasksArray[index]["end"] = new Date();
    saveLocal("storedTasks", JSON.stringify(tasksArray));
    showPendingTasks();
    showCompletedTasks();
}

function deleteTask(id) {
    const index = tasksArray
        .map((task) => {
            return task["id"];
        })
        .indexOf(id);
    tasksArray.splice(index, 1);
    saveLocal("storedTasks", JSON.stringify(tasksArray));
    showPendingTasks();
}

function editTask(id) {
    console.log("Intenta Editar!");
}
