package com.dlinteriorismo.sistema_interiorismo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "proyectos")
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProyecto;

    private Integer idCliente;

    private Integer idTipo;

    private String nombreProyecto;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private String estado;

    private String descripcion;
}