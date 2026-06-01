const API_CLIENTES = "/api/clientes";

document.addEventListener("DOMContentLoaded", () => {
    listarClientes();

    document.getElementById("dni").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 8);
    });

    document.getElementById("telefono").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 9);
    });
});

function guardarCliente() {
    const cliente = {
        nombre: document.getElementById("nombre").value,
        dni: document.getElementById("dni").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        direccion: document.getElementById("direccion").value
    };

    if (cliente.nombre === "" || cliente.dni === "" || cliente.telefono === "") {
        alert("Complete los campos obligatorios");
        return;
    }

    if (cliente.dni.length !== 8) {
        mostrarToast("El DNI debe tener exactamente 8 dígitos", "warning");
        return;
    }

    if (cliente.telefono.length !== 9) {
        mostrarToast("El teléfono debe tener exactamente 9 dígitos", "warning");
        return;
    }

    fetch(API_CLIENTES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    })
        .then(response => {
            if (!response.ok) {
                throw new mostrarToast("No se pudo guardar el cliente", "error");
            }
            return response.json();
        })
        .then(() => {
            mostrarToast("Cliente registrado correctamente", "success");
            limpiarFormulario();
            listarClientes();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("No se pudo guardar el cliente");
        });
}

function listarClientes() {
    fetch(API_CLIENTES)
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("tablaClientes");
            tabla.innerHTML = "";

            data.forEach(cliente => {
                tabla.innerHTML += `
                    <tr>
                        <td>${cliente.idCliente}</td>
                        <td>${cliente.nombre}</td>
                        <td>${cliente.dni}</td>
                        <td>${cliente.telefono}</td>
                        <td>${cliente.correo || ""}</td>
                        <td>${cliente.direccion || ""}</td>
                        <td>
                            <button onclick="eliminarCliente(${cliente.idCliente})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error("Error al listar:", error));
}

function eliminarCliente(id) {
    fetch(`${API_CLIENTES}/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            alert("Cliente eliminado");
            listarClientes();
        });
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("dni").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("direccion").value = "";
}
function exportarClientes() {
    window.location.href = "/api/reportes/clientes-excel";
}
function mostrarToast(mensaje, tipo = "success") {
    const toast = document.getElementById("toast");

    toast.textContent = mensaje;
    toast.className = "toast show " + tipo;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}