package com.dlinteriorismo.sistema_interiorismo.repository;

import com.dlinteriorismo.sistema_interiorismo.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadoRepository extends JpaRepository<Empleado, Integer> {
}