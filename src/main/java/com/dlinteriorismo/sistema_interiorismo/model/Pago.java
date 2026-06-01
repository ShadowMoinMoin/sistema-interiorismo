package com.dlinteriorismo.sistema_interiorismo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "pagos")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPago;

    private Integer idFactura;

    private LocalDate fechaPago;

    private String metodoPago;

    private BigDecimal monto;

    private String referencia;
}