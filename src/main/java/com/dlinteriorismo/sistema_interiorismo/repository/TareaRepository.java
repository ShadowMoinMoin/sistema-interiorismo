package com.dlinteriorismo.sistema_interiorismo.repository;

import com.dlinteriorismo.sistema_interiorismo.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareaRepository extends JpaRepository<Tarea, Integer> {
}