const agregarButton = document.querySelector(".btn.btn-primary");
const eliminarButton = document.querySelector(".btn.btn-danger");
const table = document.querySelector("table");

const mostrarNotificacion = (mensaje, tipo) => {
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: tipo === "success" ? "#28a745" : "#dc3545",
      borderRadius: "8px",
      boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
      fontSize: "14px",
      padding: "12px 20px",
      fontWeight: "500",
      color: "white"
    },
    onClick: function(){},
    stopOnFocus: true,
    close: true,
    className: "custom-toast",
    offset: {
      x: 20,
      y: 20
    },
    escapeMarkup: false,
  }).showToast();
};

const cargarPacientes = () => {
  const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
  pacientes.forEach((paciente) => {
    agregarFilaPaciente(paciente.nombre, paciente.edad, paciente.genero, paciente.servicio);
  });

  if (pacientes.length > 0) {
    mostrarNotificacion(`Se cargaron ${pacientes.length} paciente(s)`, "success");
  }
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
    mostrarNotificacion("Paciente agregado correctamente. Complete sus datos.", "success");
});

eliminarButton.addEventListener("click", () => {
  const checkboxes = table.querySelectorAll("input[type='checkbox']:checked");

  if (checkboxes.length === 0) {
    mostrarNotificacion("Selecciona al menos un paciente para eliminar", "error");
    return;
  }

  checkboxes.forEach((checkbox) => {
    const fila = checkbox.closest("tr");
    fila.remove();
  });
  guardarPacientes();
  mostrarNotificacion(`Se eliminaron ${checkboxes.length} paciente(s)`, "success");
});

table.addEventListener("input", guardarPacientes);
table.addEventListener("change", guardarPacientes);

cargarPacientes();