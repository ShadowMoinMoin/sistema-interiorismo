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
        nombre: document.getElementById("nombre").value.trim(),
        dni: document.getElementById("dni").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        direccion: document.getElementById("direccion").value.trim()
    };

    // VALIDACIONES

    if (
        cliente.nombre === "" ||
        cliente.dni === "" ||
        cliente.telefono === ""
    ) {

        mostrarToast(
            "Complete los campos obligatorios",
            "warning"
        );

        return;
    }

    if (cliente.dni.length !== 8) {

        mostrarToast(
            "El DNI debe tener exactamente 8 dígitos",
            "warning"
        );

        return;
    }

    if (cliente.telefono.length !== 9) {

        mostrarToast(
            "El teléfono debe tener exactamente 9 dígitos",
            "warning"
        );

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
                throw new Error(
                    "Error HTTP " + response.status
                );
            }

            return response.text();
        })

        .then(() => {

            mostrarToast(
                "Cliente registrado correctamente",
                "success"
            );

            limpiarFormulario();

            listarClientes();

        })

        .catch(error => {

            console.error(error);

            mostrarToast(
                "No se pudo guardar el cliente",
                "error"
            );

        });
}

function listarClientes() {

    fetch(API_CLIENTES)

        .then(response => response.json())

        .then(data => {

            const tabla =
                document.getElementById("tablaClientes");

            tabla.innerHTML = "";

            data.forEach(cliente => {

                tabla.innerHTML += `
                    <tr>
                        <td>${cliente.nombre}</td>
                        <td>${cliente.dni}</td>
                        <td>${cliente.telefono}</td>
                        <td>${cliente.correo || ""}</td>
                        <td>${cliente.direccion || ""}</td>
                        <td>
                            <button
                                class="btn-eliminar"
                                onclick="eliminarCliente(${cliente.idCliente})">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `;
            });

        })

        .catch(error => {

            console.error(
                "Error al listar clientes:",
                error
            );

            mostrarToast(
                "No se pudieron cargar los clientes",
                "error"
            );

        });
}

function eliminarCliente(id) {

    Swal.fire({
        title: "¿Eliminar cliente?",
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

                fetch(`${API_CLIENTES}/${id}`, {
                    method: "DELETE"
                })

                    .then(() => {

                        mostrarToast(
                            "Cliente eliminado correctamente",
                            "success"
                        );

                        listarClientes();

                    })

                    .catch(() => {

                        mostrarToast(
                            "No se pudo eliminar el cliente",
                            "error"
                        );

                    });

            }

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

    window.location.href =
        "/api/reportes/clientes-excel";

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