const API_EMPLEADOS = "/api/empleados";

document.addEventListener("DOMContentLoaded", () => {

    listarEmpleados();

    document.getElementById("telefono").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 9);
    });

});

function guardarEmpleado() {

    const empleado = {
        nombre: document.getElementById("nombre").value.trim(),
        cargo: document.getElementById("cargo").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        correo: document.getElementById("correo").value.trim()
    };

    // VALIDACIONES

    if (
        empleado.nombre === "" ||
        empleado.cargo === ""
    ) {

        mostrarToast(
            "Complete nombre y cargo",
            "warning"
        );

        return;
    }

    if (empleado.telefono === "") {

        mostrarToast(
            "Ingrese el teléfono",
            "warning"
        );

        return;
    }

    if (empleado.telefono.length !== 9) {

        mostrarToast(
            "El teléfono debe tener exactamente 9 dígitos",
            "warning"
        );

        return;
    }

    fetch(API_EMPLEADOS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(empleado)
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
                "Empleado registrado correctamente",
                "success"
            );

            limpiarFormulario();

            listarEmpleados();

        })

        .catch(error => {

            console.error(error);

            mostrarToast(
                "No se pudo guardar el empleado",
                "error"
            );

        });

}

function listarEmpleados() {

    fetch(API_EMPLEADOS)

        .then(response => response.json())

        .then(data => {

            const tabla =
                document.getElementById("tablaEmpleados");

            tabla.innerHTML = "";

            data.forEach(empleado => {

                tabla.innerHTML += `
                <tr>

                    <td>${empleado.nombre}</td>

                    <td>${empleado.cargo}</td>

                    <td>${empleado.telefono}</td>

                    <td>${empleado.correo || ""}</td>

                    <td>
                        <button
                            class="btn-eliminar"
                            onclick="eliminarEmpleado(${empleado.idEmpleado})">
                            Eliminar
                        </button>
                    </td>

                </tr>
            `;
            });

        })

        .catch(error => {

            console.error(error);

            mostrarToast(
                "No se pudieron cargar los empleados",
                "error"
            );

        });

}

function eliminarEmpleado(id) {

    Swal.fire({
        title: "¿Eliminar empleado?",
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

                fetch(`${API_EMPLEADOS}/${id}`, {
                    method: "DELETE"
                })

                    .then(() => {

                        mostrarToast(
                            "Empleado eliminado correctamente",
                            "success"
                        );

                        listarEmpleados();

                    })

                    .catch(() => {

                        mostrarToast(
                            "No se pudo eliminar el empleado",
                            "error"
                        );

                    });

            }

        });

}

function limpiarFormulario() {

    document.getElementById("nombre").value = "";
    document.getElementById("cargo").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";

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