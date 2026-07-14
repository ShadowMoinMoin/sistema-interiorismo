const API_PAGOS = "/api/pagos";
const API_FACTURAS = "/api/facturas";
let facturasCargadas = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarFacturas();
    listarPagos();
    document.getElementById("idFactura").addEventListener("change", rellenarMontoFactura);
});

function cargarFacturas() {
    fetch(API_FACTURAS)
        .then(r => r.json())
        .then(data => {
            facturasCargadas = data;

            const select = document.getElementById("idFactura");
            select.innerHTML = '<option value="">Seleccione factura</option>';

            data.forEach(f => {
                select.innerHTML += `
                    <option value="${f.idFactura}">
                        Factura ${f.numeroFactura} - S/ ${Number(f.total).toFixed(2)}
                    </option>
                `;
            });
        });
}

function guardarPago() {
    const pago = {
        idFactura: document.getElementById("idFactura").value,
        metodoPago: document.getElementById("metodoPago").value,
        monto: document.getElementById("monto").value,
        referencia: document.getElementById("referencia").value.trim()
    };

    if (pago.idFactura === "" || pago.metodoPago === "" || pago.monto === "") {
        mostrarToast("Complete factura, método y monto", "warning");
        return;
    }

    if (Number(pago.monto) <= 0) {
        mostrarToast("El monto debe ser mayor a 0", "warning");
        return;
    }

    fetch(API_PAGOS, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(pago)
    })
        .then(response => {
            if (!response.ok) throw new Error("Error al registrar pago");
            return response.json();
        })
        .then(() => {
            mostrarToast("Pago registrado correctamente", "success");
            limpiarFormulario();
            listarPagos();
        })
        .catch(() => mostrarToast("No se pudo registrar el pago", "error"));
}

function listarPagos() {

    Promise.all([
        fetch(API_PAGOS).then(r => r.json()),
        fetch(API_FACTURAS).then(r => r.json())
    ])

        .then(([pagos, facturas]) => {

            const tabla =
                document.getElementById("tablaPagos");

            tabla.innerHTML = "";

            pagos.forEach(p => {

                const factura =
                    facturas.find(
                        f => f.idFactura == p.idFactura
                    );

                tabla.innerHTML += `
                <tr>

                    <td>
                        ${factura
                    ? factura.numeroFactura
                    : '-'}
                    </td>

                    <td>
                        ${p.fechaPago || ''}
                    </td>

                    <td>
                        ${p.metodoPago}
                    </td>

                    <td>
                        S/ ${Number(p.monto).toFixed(2)}
                    </td>

                    <td>
                        ${p.referencia || '-'}
                    </td>

                    <td>

                        <button
                            class="btn-eliminar"
                            onclick="eliminarPago(${p.idPago})">

                            Eliminar

                        </button>

                    </td>

                </tr>
            `;
            });

        })
.catch(error => {

        console.error(
            "Error al listar pagos:",
            error
        );

        mostrarToast(
            "No se pudieron cargar los pagos",
            "error"
        );

    });

}

function eliminarPago(id) {

    Swal.fire({
        title: "¿Eliminar pago?",
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

                fetch(`${API_PAGOS}/${id}`, {
                    method: "DELETE"
                })

                    .then(() => {

                        mostrarToast(
                            "Pago eliminado correctamente",
                            "success"
                        );

                        listarPagos();

                    })

                    .catch(() => {

                        mostrarToast(
                            "No se pudo eliminar el pago",
                            "error"
                        );

                    });

            }

        });

}

function limpiarFormulario() {
    document.getElementById("idFactura").value = "";
    document.getElementById("metodoPago").value = "";
    document.getElementById("monto").value = "";
    document.getElementById("referencia").value = "";
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
function rellenarMontoFactura() {
    const idFactura = document.getElementById("idFactura").value;
    const factura = facturasCargadas.find(f => f.idFactura == idFactura);

    if (factura) {
        document.getElementById("monto").value = Number(factura.total).toFixed(2);
    } else {
        document.getElementById("monto").value = "";
    }
}