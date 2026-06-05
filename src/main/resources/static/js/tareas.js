const API_TAREAS = "/api/tareas";
const API_PROYECTOS = "/api/proyectos";
const API_EMPLEADOS = "/api/empleados";

document.addEventListener("DOMContentLoaded", () => {
    cargarProyectos();
    cargarEmpleados();
    listarTareas();
});

function cargarProyectos() {
    fetch(API_PROYECTOS)
        .then(r => r.json())
        .then(data => {
            const select = document.getElementById("idProyecto");
            select.innerHTML = '<option value="">Seleccione proyecto</option>';

            data.forEach(p => {
                select.innerHTML += `
                    <option value="${p.idProyecto}">
                        ${p.nombreProyecto}
                    </option>
                `;
            });
        });
}

function cargarEmpleados() {
    fetch(API_EMPLEADOS)
        .then(r => r.json())
        .then(data => {
            const select = document.getElementById("idEmpleado");
            select.innerHTML = '<option value="">Seleccione empleado</option>';

            data.forEach(e => {
                select.innerHTML += `
                    <option value="${e.idEmpleado}">
                        ${e.nombre} - ${e.cargo}
                    </option>
                `;
            });
        });
}

function guardarTarea() {
    const tarea = {
        idProyecto: document.getElementById("idProyecto").value,
        idEmpleado: document.getElementById("idEmpleado").value,
        descripcion: document.getElementById("descripcion").value.trim(),
        fechaLimite: document.getElementById("fechaLimite").value,
        estado: document.getElementById("estado").value
    };

    if (tarea.idProyecto === "" || tarea.idEmpleado === "" || tarea.descripcion === "") {
        mostrarToast("Complete proyecto, empleado y descripción", "warning");
        return;
    }

    fetch(API_TAREAS, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(tarea)
    })
        .then(response => {
            if (!response.ok) throw new Error("Error al guardar tarea");
            return response.json();
        })
        .then(() => {
            mostrarToast("Tarea registrada correctamente", "success");
            limpiarFormulario();
            listarTareas();
        })
        .catch(() => mostrarToast("No se pudo registrar la tarea", "error"));
}

function listarTareas() {
    fetch(API_TAREAS)
        .then(r => r.json())
        .then(data => {
            const tabla = document.getElementById("tablaTareas");
            tabla.innerHTML = "";

            data.forEach(t => {
                tabla.innerHTML += `
                    <tr>
                        <td>${t.idTarea}</td>
                        <td>${t.idProyecto}</td>
                        <td>${t.idEmpleado}</td>
                        <td>${t.descripcion}</td>
                        <td>${t.fechaLimite || ""}</td>
                        <td>${t.estado || ""}</td>
                        <td>
                            <button onclick="eliminarTarea(${t.idTarea})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function eliminarTarea(id) {
    fetch(`${API_TAREAS}/${id}`, {method: "DELETE"})
        .then(() => {
            mostrarToast("Tarea eliminada", "success");
            listarTareas();
        });
}

function limpiarFormulario() {
    document.getElementById("idProyecto").value = "";
    document.getElementById("idEmpleado").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("fechaLimite").value = "";
    document.getElementById("estado").value = "Pendiente";
}

function mostrarToast(mensaje, tipo = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.className = "toast show " + tipo;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}