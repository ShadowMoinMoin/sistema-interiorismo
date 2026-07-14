const API_PROYECTOS = "/api/proyectos";
const API_CLIENTES = "/api/clientes";
const API_TIPOS = "/api/tipos-proyecto";

document.addEventListener("DOMContentLoaded", () => {
    cargarClientes();
    cargarTiposProyecto();
    listarProyectos();
});

function cargarClientes() {
    fetch(API_CLIENTES)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById("idCliente");
            select.innerHTML = '<option value="">Seleccione cliente</option>';

            data.forEach(cliente => {
                select.innerHTML += `
                    <option value="${cliente.idCliente}">
                        ${cliente.nombre}
                    </option>
                `;
            });
        });
}

function cargarTiposProyecto() {
    fetch(API_TIPOS)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById("idTipo");
            select.innerHTML = '<option value="">Seleccione tipo de proyecto</option>';

            data.forEach(tipo => {
                select.innerHTML += `
                    <option value="${tipo.idTipo}">
                        ${tipo.nombreTipo}
                    </option>
                `;
            });
        });
}

function guardarProyecto() {
    const proyecto = {

        cliente: {
            idCliente: document.getElementById("idCliente").value
        },

        tipoProyecto: {
            idTipo: document.getElementById("idTipo").value
        },

        nombreProyecto:
            document.getElementById("nombreProyecto").value.trim(),

        fechaInicio:
        document.getElementById("fechaInicio").value,

        fechaFin:
        document.getElementById("fechaFin").value,

        estado:
        document.getElementById("estado").value,

        descripcion:
            document.getElementById("descripcion").value.trim()
    };

    if (proyecto.cliente.idCliente === "" ||
        proyecto.tipoProyecto.idTipo === "" ||
        proyecto.nombreProyecto === "") {
        mostrarToast("Complete cliente, tipo y nombre del proyecto", "warning");
        return;
    }
    console.log(proyecto);
    fetch(API_PROYECTOS, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(proyecto)
    })
        .then(response => {
            if (!response.ok) throw new Error("Error al guardar proyecto");
            return response.json();
        })
        .then(() => {
            mostrarToast("Proyecto registrado correctamente", "success");
            limpiarFormulario();
            listarProyectos();
        })
        .catch(() => mostrarToast("No se pudo guardar el proyecto", "error"));
    if (proyecto.fechaInicio === "") {

        mostrarToast(
            "Seleccione la fecha de inicio",
            "warning"
        );

        return;
    }

    if (proyecto.estado === "") {

        mostrarToast(
            "Seleccione el estado del proyecto",
            "warning"
        );

        return;
    }
    if (
        proyecto.fechaFin !== "" &&
        proyecto.fechaFin < proyecto.fechaInicio
    ) {

        mostrarToast(
            "La fecha fin no puede ser menor a la fecha inicio",
            "warning"
        );

        return;
    }
}

function listarProyectos() {

    fetch(API_PROYECTOS)
        .then(r => r.json())
        .then(proyectos => {

            const tabla =
                document.getElementById("tablaProyectos");

            tabla.innerHTML = "";

            proyectos.forEach(p => {

                tabla.innerHTML += `
                    <tr>

                        <td>${p.nombreProyecto}</td>

                        <td>
                            ${p.cliente?.nombre || '-'}
                        </td>

                        <td>
                            ${p.tipoProyecto?.nombreTipo || '-'}
                        </td>

                        <td>${p.fechaInicio || ''}</td>

                        <td>${p.fechaFin || ''}</td>

                        <td>${p.estado || ''}</td>

                        <td>
                            <button
                                class="btn-eliminar"
                                onclick="eliminarProyecto(${p.idProyecto})">
                                Eliminar
                            </button>
                        </td>

                    </tr>
                `;
            });

        })
        .catch(error => {
            console.error(error);
        });
}
function eliminarProyecto(id) {

    Swal.fire({
        title: "¿Eliminar proyecto?",
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

                fetch(`${API_PROYECTOS}/${id}`, {
                    method: "DELETE"
                })

                    .then(() => {

                        mostrarToast(
                            "Proyecto eliminado correctamente",
                            "success"
                        );

                        listarProyectos();

                    })

                    .catch(() => {

                        mostrarToast(
                            "No se pudo eliminar el proyecto",
                            "error"
                        );

                    });

            }

        });

}

function limpiarFormulario() {
    document.getElementById("idCliente").value = "";
    document.getElementById("idTipo").value = "";
    document.getElementById("nombreProyecto").value = "";
    document.getElementById("fechaInicio").value = "";
    document.getElementById("fechaFin").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("descripcion").value = "";
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