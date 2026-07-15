package com.dlinteriorismo.sistema_interiorismo.dto;

import lombok.Data;

@Data
public class ClienteDTO {

    private Integer idCliente;
    private String nombre;
    private String dni;
    private String telefono;
    private String correo;
    private String direccion;

}