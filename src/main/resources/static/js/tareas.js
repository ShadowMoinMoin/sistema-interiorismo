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
    if (tarea.fechaLimite === "") {

        mostrarToast(
            "Seleccione la fecha límite",
            "warning"
        );

        return;
    }
}

function listarTareas() {

    Promise.all([
        fetch(API_TAREAS).then(r => r.json()),
        fetch(API_PROYECTOS).then(r => r.json()),
        fetch(API_EMPLEADOS).then(r => r.json())
    ])

        .then(([tareas, proyectos, empleados]) => {

            const tabla =
                document.getElementById("tablaTareas");

            tabla.innerHTML = "";

            tareas.forEach(t => {

                const proyecto =
                    proyectos.find(
                        p => p.idProyecto == t.idProyecto
                    );

                const empleado =
                    empleados.find(
                        e => e.idEmpleado == t.idEmpleado
                    );

                tabla.innerHTML += `

                <tr>

                    <td>
                        ${proyecto
                    ? proyecto.nombreProyecto
                    : '-'}
                    </td>

                    <td>
                        ${empleado
                    ? empleado.nombre
                    : '-'}
                    </td>

                    <td>
                        ${t.descripcion}
                    </td>

                    <td>
                        ${t.fechaLimite || ''}
                    </td>

                    <td>

                        <span class="estado estado-${t.estado.toLowerCase().replace(' ','-')}">

                            ${t.estado}

                        </span>

                    </td>

                    <td>

                        <button
                            class="btn-eliminar"
                            onclick="eliminarTarea(${t.idTarea})">

                            Eliminar

                        </button>

                    </td>

                </tr>

            `;
            });

        })
        .catch(error => {

            console.error(
                "Error al listar tareas:",
                error
            );

            mostrarToast(
                "No se pudieron cargar las tareas",
                "error"
            );

        });

}

function eliminarTarea(id) {

    Swal.fire({
        title: "¿Eliminar tarea?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    })

        .then((result) => {

            if (result.isConfirmed) {

                fetch(`${API_TAREAS}/${id}`, {
                    method: "DELETE"
                })

                    .then(() => {

                        mostrarToast(
                            "Tarea eliminada correctamente",
                            "success"
                        );

                        listarTareas();

                    })

                    .catch(() => {

                        mostrarToast(
                            "No se pudo eliminar la tarea",
                            "error"
                        );

                    });

            }

        });

}

function limpiarFormulario() {
    document.getElementById("idProyecto").value = "";
    document.getElementById("idEmpleado").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("fechaLimite").value = "";
    document.getElementById("estado").value = "Pendiente";
}

function mostrarToast(
    mensaje,
    icono = "success"
) {

    Swal.fire({
        toast: true,
        position: "top-end",
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });

}