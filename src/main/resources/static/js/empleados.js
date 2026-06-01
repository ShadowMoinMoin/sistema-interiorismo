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

    if (empleado.nombre === "" || empleado.cargo === "") {
        mostrarToast("Complete nombre y cargo", "warning");
        return;
    }

    if (empleado.telefono.length !== 9) {
        mostrarToast("El teléfono debe tener exactamente 9 dígitos", "warning");
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
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(() => {
            mostrarToast("Empleado registrado correctamente", "success");
            limpiarFormulario();
            listarEmpleados();
        })
        .catch(error => {
            console.error("Error:", error);
            mostrarToast("No se pudo guardar el empleado", "error");
        });
}

function listarEmpleados() {
    fetch(API_EMPLEADOS)
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("tablaEmpleados");
            tabla.innerHTML = "";

            data.forEach(empleado => {
                tabla.innerHTML += `
                    <tr>
                        <td>${empleado.idEmpleado}</td>
                        <td>${empleado.nombre}</td>
                        <td>${empleado.cargo}</td>
                        <td>${empleado.telefono}</td>
                        <td>${empleado.correo || ""}</td>
                        <td>
                            <button onclick="eliminarEmpleado(${empleado.idEmpleado})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function eliminarEmpleado(id) {
    fetch(`${API_EMPLEADOS}/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            mostrarToast("Empleado eliminado correctamente", "success");
            listarEmpleados();
        });
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("cargo").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
}

function mostrarToast(mensaje, tipo = "success") {
    const toast = document.getElementById("toast");

    toast.textContent = mensaje;
    toast.className = "toast show " + tipo;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}