package com.dlinteriorismo.sistema_interiorismo.dto;

import lombok.Data;

@Data
public class DashboardDTO {

    private Long totalProyectos;
    private Long totalCotizaciones;
    private Long totalFacturas;
    private Long totalPagos;
    private Long totalTareas;
    private Long proyectosPendientes;
    private Long proyectosEnProceso;
    private Long proyectosCompletados;
    private Long proyectosCancelados;
}