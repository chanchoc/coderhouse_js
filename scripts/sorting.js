// Aquí tengo la lógica para ordernar las tareas

const sortingForm = document.getElementById("sorting");

sortingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sortTasks();
});

// Funcion para hacer el sort de las tareas. Solo re-renderizo cuando se hace un cambio efectivo en el array
function sortTasks() {
    const sortType = document.getElementById("sort-type").value;
    const sortOrder = document.getElementById("sort-order").value;
    let tasksArrayOld = [...tasksArray];
    if (sortOrder === "asc") {
        tasksArray.sort((a, b) => a[sortType] - b[sortType]);
    } else {
        tasksArray.sort((a, b) => b[sortType] - a[sortType]);
    }
    if (JSON.stringify(tasksArrayOld) !== JSON.stringify(tasksArray)) {
        showPendingTasks();
    }
}
