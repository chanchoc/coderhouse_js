// Aquí tengo la lógica de la modal para crear nuevas tareas

const newModal = document.querySelector(".new-task-modal");
const editionModal = document.querySelector(".edit-task-modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector("#new-task");
const closeNewModalBtn = document.querySelector("#new-task-close");
const closeEditionModalBtn = document.querySelector("#edit-task-close");

const openModal = () => {
    newModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = () => {
    newModal.classList.add("hidden");
    overlay.classList.add("hidden");
    editionModal.classList.add("hidden");
};

openModalBtn.addEventListener("click", openModal);
closeNewModalBtn.addEventListener("click", closeModal);
closeEditionModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
