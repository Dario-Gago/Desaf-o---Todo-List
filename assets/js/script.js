const btnAgregar = document.getElementById('btn-a'); // Botón para agregar
const inpA = document.getElementById('inp-a'); // Input de texto
const div = document.getElementById('div'); // Div para la lista
const total = document.getElementById('total'); // Total de tareas
const ready = document.getElementById('ready'); // Total de tareas marcadas

let ultimoId = 400; // Variable para llevar el último ID generado

const invitados = [
    { id: 200, nombre: 'Hacer la cama', marcado: false },
    { id: 300, nombre: 'Lavarme los dientes', marcado: false },
    { id: 400, nombre: 'Almorzar a las 13:00', marcado: false },
]; // Array inicial con una tarea

// Función para renderizar la lista
function renderizarLista() {
    let html = "";
    for (const invitado of invitados) {
        html += `
            <tr>
                <td>ID: ${invitado.id}</td> <td>${invitado.nombre}
                <input 
                    type="checkbox" 
                    data-id="${invitado.id}" 
                    class="check" 
                    ${invitado.marcado ? "checked" : ""}
                >
                <button onclick="eliminar(${invitado.id})">❌</button>
                </td> 
                
            </tr>`;
    }
    div.innerHTML = html;
    total.textContent = invitados.length; // Actualizar el total

    // Agregar eventos a los checkboxes
    const checkboxes = document.querySelectorAll('.check');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const invitado = invitados.find((ele) => ele.id === id);
            if (invitado) {
                invitado.marcado = e.target.checked; // Actualizar el estado
            }
            actualizarContador();
        });
    });
}

// Función para eliminar una tarea
function eliminar(id) {
    const index = invitados.findIndex((ele) => ele.id === id);
    if (index !== -1) {
        invitados.splice(index, 1); // Eliminar la tarea del array
    }
    renderizarLista(); // Volver a renderizar la lista
    actualizarContador(); // Actualizar el contador de marcados
}

// Función para actualizar el contador de marcados
function actualizarContador() {
    const tareasMarcadas = invitados.filter((invitado) => invitado.marcado).length;
    ready.textContent = tareasMarcadas; // Actualizar el contador
}

// Evento para agregar una nueva tarea
btnAgregar.addEventListener('click', () => {
    const valorDelInp = inpA.value.trim(); // Obtener y limpiar el valor del input
    if (valorDelInp === "") return; // Evitar agregar tareas vacías

    ultimoId += 1; // Incrementar el ID

    invitados.push({
        id: ultimoId, // Asignar un ID único
        nombre: valorDelInp,
        marcado: false, // Por defecto, no está marcado
    });

    inpA.value = ""; // Limpiar el input
    renderizarLista(); // Actualizar la lista
    actualizarContador(); // Actualizar el contador
});

// Renderizar la lista inicial
renderizarLista();
