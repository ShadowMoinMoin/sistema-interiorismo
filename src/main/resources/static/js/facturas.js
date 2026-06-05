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
            const tabla = document.getElementById("tablaFacturas");
            tabla.innerHTML = "";

            data.forEach(f => {
                tabla.innerHTML += `
                    <tr>
                        <td>${f.idFactura}</td>
                        <td>${f.numeroFactura}</td>
                        <td>${f.idCotizacion}</td>
                        <td>${f.fecha || ""}</td>
                        <td>S/ ${Number(f.total).toFixed(2)}</td>
                        <td>${f.estado}</td>
                        <td>
                            <button onclick="eliminarFactura(${f.idFactura})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function eliminarFactura(id) {
    fetch(`${API_FACTURAS}/${id}`, {method: "DELETE"})
        .then(() => {
            mostrarToast("Factura eliminada", "success");
            listarFacturas();
        });
}

function mostrarToast(mensaje, tipo = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.className = "toast show " + tipo;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}