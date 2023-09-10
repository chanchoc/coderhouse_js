/* Archivo de código principal.
Contiene las principales funcionalidades del proyecto. */

// Ingreso de nombre y apellido del usuario
// Me aseguro que ingrese un nombre válido
function nameLoader(type) {
    let name;
    do {
        if (name === "") {
            alert("Por favor ingrese un " + type + " válido!");
        }
        name = prompt("Ingrese su " + type + ":");
    } while (name.trim() === "");
    return name;
}

let firstName = nameLoader("Nombre");
let lastName = nameLoader("Apellido");

console.log(firstName);
console.log(lastName);
