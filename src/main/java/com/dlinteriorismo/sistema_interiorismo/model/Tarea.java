package com.dlinteriorismo.sistema_interiorismo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "tareas")
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTarea;

    private Integer idProyecto;

    private Integer idEmpleado;

    private String descripcion;

    private LocalDate fechaLimite;

    private String estado;
}