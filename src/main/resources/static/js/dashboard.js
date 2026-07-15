const TIEMPO_MAXIMO_RESPUESTA = 1;
async function fetchMonitoreado(url) {

    const inicio = performance.now();

    try {

        const response = await fetchMonitoreado(url);

        const fin = performance.now();

        const tiempoRespuesta = fin - inicio;

        console.log(
            `Solicitud: ${url} | Tiempo de respuesta: ${tiempoRespuesta.toFixed(2)} ms`
        );

        if (tiempoRespuesta > TIEMPO_MAXIMO_RESPUESTA) {

            console.warn(
                `ADVERTENCIA: La solicitud ${url} presenta un tiempo de respuesta elevado`
            );

        }

        return response;

    } catch (error) {

        console.error(
            `Error durante la solicitud ${url}`,
            error
        );

        throw error;

    }

}
async function cargarDashboard() {

    try {

        const response =
            await fetchMonitoreado("/api/dashboard");

        const data =
            await response.json();

        document.getElementById("totalProyectos")
            .textContent = data.totalProyectos;

        document.getElementById("totalCotizaciones")
            .textContent = data.totalCotizaciones;

        document.getElementById("totalFacturas")
            .textContent = data.totalFacturas;

        document.getElementById("totalPagos")
            .textContent = data.totalPagos;

        crearDonut(data);

    } catch (error) {

        console.error(error);

    }
}

async function cargarProyectos() {

    try {

        const response =
            await fetchMonitoreado("/api/dashboard/proyectos");

        const proyectos =
            await response.json();

        let html = "";

        proyectos.forEach(p => {

            html += `
                <tr>
                    <td>${p.nombreProyecto}</td>
                    <td>${p.estado}</td>
                    <td>${p.fechaFin ?? ''}</td>
                </tr>
            `;

        });

        document.getElementById("tablaProyectos")
            .innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function cargarTareas() {

    try {

        const response =
            await fetch("/api/dashboard/tareas");

        const tareas =
            await response.json();

        let html = "";

        tareas.forEach(t => {

            html += `
                <li class="tarea-item">
                    <strong>${t.descripcion}</strong>
                    <br>
                    <small>Estado: ${t.estado}</small>
                    <br>
                    <small>Fecha límite: ${t.fechaLimite ?? ''}</small>
                </li>
            `;

        });

        document.getElementById("listaTareas")
            .innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

function crearDonut(data) {

    const total =
        data.proyectosPendientes +
        data.proyectosEnProceso +
        data.proyectosCompletados +
        data.proyectosCancelados;

    const centerText = {
        id: 'centerText',

        afterDraw(chart) {

            const { ctx } = chart;

            ctx.save();

            ctx.font = "14px Segoe UI";
            ctx.fillStyle = "#64748b";
            ctx.textAlign = "center";

            const meta = chart.getDatasetMeta(0);

            const x = meta.data[0].x;
            const y = meta.data[0].y;

            ctx.fillText("Total", x, y - 10);
            ctx.fillText(total, x, y + 25);

            ctx.restore();
        }
    };

    new Chart(
        document.getElementById("donutChart"),
        {

            type: "doughnut",

            data: {

                labels: [
                    "Pendiente",
                    "En Proceso",
                    "Finalizado",
                    "Cancelado"
                ],

                datasets: [{

                    data: [

                        data.proyectosPendientes,
                        data.proyectosEnProceso,
                        data.proyectosCompletados,
                        data.proyectosCancelados

                    ],

                    backgroundColor: [

                        "#f59e0b",
                        "#3b82f6",
                        "#22c55e",
                        "#ef4444"

                    ],

                    borderWidth: 0

                }]
            },

            options: {

                cutout: "65%",

                plugins: {

                    legend: {
                        position: "right"
                    }

                },

                maintainAspectRatio: false,
                responsive: true

            },

            plugins: [centerText]

        }
    );
}

window.onload = () => {

    cargarDashboard();
    cargarProyectos();
    cargarTareas();

};
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