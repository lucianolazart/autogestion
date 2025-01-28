const busquedaInput = document.getElementById("busqueda");
const habitaciones = document.querySelectorAll(".habitacion");

busquedaInput.addEventListener("input", (event) => {
    const filtro = event.target.value.toLowerCase();

    habitaciones.forEach((habitacion) => {
        const texto = habitacion.textContent.toLowerCase();

        if (texto.includes(filtro)) {
            habitacion.style.display = "";
        } else {
            habitacion.style.display = "none";
        }
    });
});