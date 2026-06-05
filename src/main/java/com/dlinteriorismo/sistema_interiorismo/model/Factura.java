package com.dlinteriorismo.sistema_interiorismo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "facturas")
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFactura;

    private Integer idCotizacion;

    private String numeroFactura;

    private LocalDate fecha;

    private BigDecimal total;

    private String estado;
}