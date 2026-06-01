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
    fetch(API_PAGOS)
        .then(r => r.json())
        .then(data => {
            const tabla = document.getElementById("tablaPagos");
            tabla.innerHTML = "";

            data.forEach(p => {
                tabla.innerHTML += `
                    <tr>
                        <td>${p.idPago}</td>
                        <td>${p.idFactura}</td>
                        <td>${p.fechaPago || ""}</td>
                        <td>${p.metodoPago}</td>
                        <td>S/ ${Number(p.monto).toFixed(2)}</td>
                        <td>${p.referencia || ""}</td>
                        <td>
                            <button onclick="eliminarPago(${p.idPago})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function eliminarPago(id) {
    fetch(`${API_PAGOS}/${id}`, {method: "DELETE"})
        .then(() => {
            mostrarToast("Pago eliminado", "success");
            listarPagos();
        });
}

function limpiarFormulario() {
    document.getElementById("idFactura").value = "";
    document.getElementById("metodoPago").value = "";
    document.getElementById("monto").value = "";
    document.getElementById("referencia").value = "";
}

function mostrarToast(mensaje, tipo = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.className = "toast show " + tipo;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
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