package com.dlinteriorismo.sistema_interiorismo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "cotizaciones")
public class Cotizacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCotizacion;

    private Integer idProyecto;

    private Integer idUsuario;

    private LocalDate fecha;

    private BigDecimal metraje;

    private BigDecimal subtotal;

    private BigDecimal ganancia;

    private BigDecimal total;

    private String estado;
}