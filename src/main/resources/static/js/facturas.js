const API_FACTURAS = "/api/facturas";
const API_COTIZACIONES = "/api/cotizaciones";

document.addEventListener("DOMContentLoaded", () => {
    cargarCotizaciones();
    listarFacturas();
});

function cargarCotizaciones() {
    fetch(API_COTIZACIONES)
        .then(r => r.json())
        .then(data => {
            const select = document.getElementById("idCotizacion");
            select.innerHTML = '<option value="">Seleccione cotización</option>';

            data.forEach(c => {
                select.innerHTML += `
                    <option value="${c.idCotizacion}">
                        Cotización #${c.idCotizacion} - S/ ${Number(c.total).toFixed(2)}
                    </option>
                `;
            });
        });
}

function guardarFactura() {
    const factura = {
        idCotizacion: document.getElementById("idCotizacion").value,
        estado: document.getElementById("estado").value
    };

    if (factura.idCotizacion === "") {
        mostrarToast("Seleccione una cotización", "warning");
        return;
    }

    fetch(API_FACTURAS, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(factura)
    })
        .then(response => {
            if (!response.ok) throw new Error("Error al generar factura");
            return response.json();
        })
        .then(() => {
            mostrarToast("Factura generada correctamente", "success");
            document.getElementById("idCotizacion").value = "";
            listarFacturas();
        })
        .catch(() => mostrarToast("Esta cotización ya tiene una factura generada", "warning"));
}

function listarFacturas() {

    fetch(API_FACTURAS)
        .then(r => r.json())

        .then(data => {

            const tabla =
                document.getElementById("tablaFacturas");

            tabla.innerHTML = "";

            data.forEach(f => {

                tabla.innerHTML += `
                    <tr>

                        <td>${f.numeroFactura}</td>

                        <td>${f.fecha || ""}</td>

                        <td>
                            S/ ${Number(f.total).toFixed(2)}
                        </td>

                        <td>
                            <span class="estado estado-${f.estado.toLowerCase()}">
                                ${f.estado}
                            </span>
                        </td>

                        <td>
                            <button
                                class="btn-eliminar"
                                onclick="eliminarFactura(${f.idFactura})">
                                Eliminar
                            </button>
                        </td>

                    </tr>
                `;
            });

        })

        .catch(error => {

            console.error(
                "Error al listar facturas:",
                error
            );

            mostrarToast(
                "No se pudieron cargar las facturas",
                "error"
            );

        });

}

function eliminarFactura(id) {

    Swal.fire({
        title: "¿Eliminar factura?",
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

                fetch(`${API_FACTURAS}/${id}`, {
                    method: "DELETE"
                })

                    .then(() => {

                        mostrarToast(
                            "Factura eliminada correctamente",
                            "success"
                        );

                        listarFacturas();

                    })

                    .catch(() => {

                        mostrarToast(
                            "No se pudo eliminar la factura",
                            "error"
                        );

                    });

            }

        });

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