const agregarButton = document.querySelector(".btn.btn-primary");
const eliminarButton = document.querySelector(".btn.btn-danger");
const table = document.querySelector("table");

const cargarPacientes = () => {
  const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
  pacientes.forEach((paciente) => {
    agregarFilaPaciente(paciente.nombre, paciente.edad, paciente.genero, paciente.servicio);
  });
};

const guardarPacientes = () => {
  const filas = table.querySelectorAll("tr");
  const pacientes = [];

  filas.forEach((fila, index) => {

    if (index === 0) return;

    const nombre = fila.querySelector("td:nth-child(2) input");
    const edad = fila.children[2].textContent;
    const genero = fila.children[3].textContent;
    const servicio = fila.querySelector("td:nth-child(5) select").value;

    if (nombre && nombre.value.trim()) {
        pacientes.push({
        nombre: nombre.value.trim(),
        edad: edad || "-",
        genero: genero || "-",
        servicio,
      });
    }
  });

  localStorage.setItem("pacientes", JSON.stringify(pacientes));
};

const agregarFilaPaciente = (nombre = "", edad = "-", genero = "-", servicio = "Cardiología") => {
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td class="text-center"><input type="checkbox"></td>
    <td><input type="text" class="form-control" placeholder="Nombre del paciente" value="${nombre}"></td>
    <td>${edad}</td>
    <td>${genero}</td>
    <td>
      <select class="form-select">
        <option ${servicio === "Cardiología" ? "selected" : ""}>Cardiología</option>
        <option ${servicio === "Clínica" ? "selected" : ""}>Clínica</option>
        <option ${servicio === "Ginecología" ? "selected" : ""}>Ginecología</option>
        <option ${servicio === "Geriatría" ? "selected" : ""}>Geriatría</option>
      </select>
    </td>
  `;
  table.appendChild(fila);

  guardarPacientes();
};

agregarButton.addEventListener("click", () => {
    agregarFilaPaciente();
});

eliminarButton.addEventListener("click", () => {
  const checkboxes = table.querySelectorAll("input[type='checkbox']:checked");
  checkboxes.forEach((checkbox) => {
    const fila = checkbox.closest("tr");
    fila.remove();
  });
  guardarPacientes();
});

table.addEventListener("input", guardarPacientes);
table.addEventListener("change", guardarPacientes);

cargarPacientes();