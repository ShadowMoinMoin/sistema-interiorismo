const API_COTIZACIONES = "/api/cotizaciones";
const API_PROYECTOS = "/api/proyectos";

document.addEventListener("DOMContentLoaded", () => {
    cargarProyectos();
    listarCotizaciones();

    document.getElementById("metraje").addEventListener("input", calcularDetalle);
});

function cargarProyectos() {
    fetch(API_PROYECTOS)
        .then(r => r.json())
        .then(data => {
            const select = document.getElementById("idProyecto");
            select.innerHTML = '<option value="">Seleccione proyecto</option>';

            data.forEach(p => {
                select.innerHTML += `
                    <option value="${p.idProyecto}">
                        ${p.nombreProyecto}
                    </option>
                `;
            });
        });
}

function calcularDetalle() {
    const metraje = parseFloat(document.getElementById("metraje").value);

    if (isNaN(metraje) || metraje <= 0) {
        document.getElementById("tablaDetalle").innerHTML =
            `<tr><td colspan="5">Ingrese el metraje para calcular.</td></tr>`;
        return;
    }

    const melamina = metraje * 308;
    const correderas = metraje * 15;
    const bisagras = metraje * 10;
    const tornillos = metraje * 20;
    const transporte = 30;
    const manoObra = 100;

    const subtotal = melamina + correderas + bisagras + tornillos + transporte + manoObra;
    const ganancia = subtotal * 0.80;
    const total = subtotal + ganancia;

    document.getElementById("tablaDetalle").innerHTML = `
        <tr class="fila-seccion"><td colspan="5">MATERIALES</td></tr>
        <tr>
            <td>Melamina</td>
            <td>Plancha</td>
            <td>${metraje.toFixed(2)}</td>
            <td>S/ 308.00</td>
            <td>S/ ${melamina.toFixed(2)}</td>
        </tr>

        <tr class="fila-seccion"><td colspan="5">ACCESORIOS</td></tr>
        <tr>
            <td>Correderas</td>
            <td>Par</td>
            <td>${metraje.toFixed(2)}</td>
            <td>S/ 15.00</td>
            <td>S/ ${correderas.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Bisagras</td>
            <td>Par</td>
            <td>${(metraje * 2).toFixed(2)}</td>
            <td>S/ 5.00</td>
            <td>S/ ${bisagras.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Tornillos</td>
            <td>Caja</td>
            <td>${metraje.toFixed(2)}</td>
            <td>S/ 20.00</td>
            <td>S/ ${tornillos.toFixed(2)}</td>
        </tr>

        <tr class="fila-seccion"><td colspan="5">TRANSPORTE</td></tr>
        <tr>
            <td>Transporte</td>
            <td>Servicio</td>
            <td>1</td>
            <td>S/ 30.00</td>
            <td>S/ ${transporte.toFixed(2)}</td>
        </tr>

        <tr class="fila-seccion"><td colspan="5">MANO DE OBRA</td></tr>
        <tr>
            <td>Trabajo</td>
            <td>Servicio</td>
            <td>1</td>
            <td>S/ 100.00</td>
            <td>S/ ${manoObra.toFixed(2)}</td>
        </tr>

        <tr class="fila-subtotal">
            <td colspan="4">SUBTOTAL</td>
            <td>S/ ${subtotal.toFixed(2)}</td>
        </tr>
        <tr class="fila-ganancia">
            <td colspan="4">GANANCIA</td>
            <td>S/ ${ganancia.toFixed(2)}</td>
        </tr>
        <tr class="fila-total">
            <td colspan="4">TOTAL</td>
            <td>S/ ${total.toFixed(2)}</td>
        </tr>
    `;
}

function guardarCotizacion() {
    const cotizacion = {
        idProyecto: document.getElementById("idProyecto").value,
        idUsuario: 1,
        metraje: document.getElementById("metraje").value,
        estado: "Pendiente"
    };

    if (cotizacion.idProyecto === "" || cotizacion.metraje === "") {
        mostrarToast("Seleccione proyecto e ingrese metraje", "warning");
        return;
    }

    fetch(API_COTIZACIONES, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cotizacion)
    })
        .then(response => {
            if (!response.ok) throw new Error("Error al guardar");
            return response.json();
        })
        .then(() => {
            mostrarToast("Cotización registrada correctamente", "success");
            document.getElementById("idProyecto").value = "";
            document.getElementById("metraje").value = "";
            document.getElementById("tablaDetalle").innerHTML =
                `<tr><td colspan="5">Ingrese el metraje para calcular.</td></tr>`;
            listarCotizaciones();
        })
        .catch(() => mostrarToast("No se pudo guardar la cotización", "error"));
    if (
        cotizacion.idProyecto === "" ||
        cotizacion.metraje === ""
    ) {

        mostrarToast(
            "Seleccione proyecto e ingrese metraje",
            "warning"
        );

        return;
    }

    if (Number(cotizacion.metraje) <= 0) {

        mostrarToast(
            "El metraje debe ser mayor a 0",
            "warning"
        );

        return;
    }
}

function listarCotizaciones() {

    Promise.all([
        fetch(API_COTIZACIONES).then(r => r.json()),
        fetch(API_PROYECTOS).then(r => r.json())
    ])

        .then(([cotizaciones, proyectos]) => {

            const tabla =
                document.getElementById("tablaCotizaciones");

            tabla.innerHTML = "";

            cotizaciones.forEach(c => {

                const proyecto = proyectos.find(
                    p => p.idProyecto == c.idProyecto
                );

                tabla.innerHTML += `
        <tr>

            <td>
                ${proyecto ? proyecto.nombreProyecto : '-'}
            </td>

            <td>
                ${c.fecha || ''}
            </td>

            <td>
                ${c.metraje}
            </td>

            <td>
                S/ ${Number(c.total).toFixed(2)}
            </td>

            <td>
    <span class="estado estado-${c.estado.toLowerCase()}">
        ${c.estado}
    </span>
</td>

            <td>
                <button
                    class="btn-eliminar"
                    onclick="eliminarCotizacion(${c.idCotizacion})">
                    Eliminar
                </button>
            </td>

        </tr>
    `;

            });

        });

}

function eliminarCotizacion(id) {

    Swal.fire({
        title: "¿Eliminar cotización?",
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

                fetch(`${API_COTIZACIONES}/${id}`, {
                    method: "DELETE"
                })

                    .then(() => {

                        mostrarToast(
                            "Cotización eliminada correctamente",
                            "success"
                        );

                        listarCotizaciones();

                    })

                    .catch(() => {

                        mostrarToast(
                            "No se pudo eliminar la cotización",
                            "error"
                        );

                    });

            }

        });

}
function mostrarToast(mensaje, icono = "success") {

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