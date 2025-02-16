// const habitacionesData = {
//     "disponibles": [
//       { "numero": "101", "estado": "disponible" },
//       { "numero": "102", "estado": "disponible" },
//       { "numero": "103", "estado": "disponible" },
//       { "numero": "104", "estado": "disponible" },
//       { "numero": "105", "estado": "disponible" },
//       { "numero": "110", "estado": "disponible" }
//     ],
//     "ocupadas": [
//       { 
//         "numero": "106", 
//         "estado": "ocupada",
//         "paciente": "Giacomo Guilizzoni"
//       },
//       { 
//         "numero": "107", 
//         "estado": "ocupada",
//         "paciente": "Marco Botton"
//       },
//       { 
//         "numero": "108", 
//         "estado": "ocupada",
//         "paciente": "Mariah Maclachlan"
//       },
//       { 
//         "numero": "109", 
//         "estado": "ocupada",
//         "paciente": "Valerie Liberty"
//       }
//     ]
//   };

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
  
  const cargarHabitaciones = async () => {
    const seccionDisponibles = document.querySelector('section:first-of-type ul');
    const seccionOcupadas = document.querySelector('section:last-of-type ul');
    
    seccionDisponibles.innerHTML = '';
    seccionOcupadas.innerHTML = '';

    const habitacionesJSON = await fetch('habitaciones.json');
    console.log(habitacionesJSON);
    const habitacionesData = await habitacionesJSON.json();
    
    habitacionesData.disponibles.forEach(habitacion => {
      const li = document.createElement('li');
      li.className = 'habitacion';
      li.textContent = `Habitación ${habitacion.numero}`;
      seccionDisponibles.appendChild(li);
    });
    
    habitacionesData.ocupadas.forEach(habitacion => {
      const li = document.createElement('li');
      li.className = 'habitacion';
      li.textContent = `Habitación ${habitacion.numero} - ${habitacion.paciente}`;
      seccionOcupadas.appendChild(li);
    });
    
    mostrarNotificacion('Habitaciones cargadas correctamente', 'success');
  };
  
  const busquedaInput = document.getElementById("busqueda");
  busquedaInput.addEventListener("input", (event) => {
    const filtro = event.target.value.toLowerCase();
    const habitaciones = document.querySelectorAll(".habitacion");
    
    habitaciones.forEach((habitacion) => {
      const texto = habitacion.textContent.toLowerCase();
      if (texto.includes(filtro)) {
        habitacion.style.display = "";
      } else {
        habitacion.style.display = "none";
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', cargarHabitaciones);