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
        idCliente: document.getElementById("idCliente").value,
        idTipo: document.getElementById("idTipo").value,
        nombreProyecto: document.getElementById("nombreProyecto").value.trim(),
        fechaInicio: document.getElementById("fechaInicio").value,
        fechaFin: document.getElementById("fechaFin").value,
        estado: document.getElementById("estado").value,
        descripcion: document.getElementById("descripcion").value.trim()
    };

    if (proyecto.idCliente === "" || proyecto.idTipo === "" || proyecto.nombreProyecto === "") {
        mostrarToast("Complete cliente, tipo y nombre del proyecto", "warning");
        return;
    }

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
}

function listarProyectos() {
    fetch(API_PROYECTOS)
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("tablaProyectos");
            tabla.innerHTML = "";

            data.forEach(p => {
                tabla.innerHTML += `
                    <tr>
                        <td>${p.idProyecto}</td>
                        <td>${p.idCliente}</td>
                        <td>${p.idTipo}</td>
                        <td>${p.nombreProyecto}</td>
                        <td>${p.fechaInicio || ""}</td>
                        <td>${p.fechaFin || ""}</td>
                        <td>${p.estado || ""}</td>
                        <td>
                            <button onclick="eliminarProyecto(${p.idProyecto})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function eliminarProyecto(id) {
    fetch(`${API_PROYECTOS}/${id}`, { method: "DELETE" })
        .then(() => {
            mostrarToast("Proyecto eliminado correctamente", "success");
            listarProyectos();
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

function mostrarToast(mensaje, tipo = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.className = "toast show " + tipo;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}