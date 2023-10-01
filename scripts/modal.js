// Aquí tengo la lógica de la modal para crear nuevas tareas

const modal = document.querySelector(".new-task-modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector("#new-task");
const closeModalBtn = document.querySelector("#new-task-close");

const openModal = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
