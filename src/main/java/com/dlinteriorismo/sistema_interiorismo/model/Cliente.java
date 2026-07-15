package com.dlinteriorismo.sistema_interiorismo.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCliente;

    private String nombre;
    @NotNull
    private String dni;
    private String telefono;
    private String correo;
    private String direccion;
}
