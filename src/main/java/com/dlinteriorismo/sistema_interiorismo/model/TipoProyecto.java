package com.dlinteriorismo.sistema_interiorismo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tipos_proyecto")
public class TipoProyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTipo;

    private String nombreTipo;

    private String descripcion;
}