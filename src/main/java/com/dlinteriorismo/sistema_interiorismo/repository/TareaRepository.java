package com.dlinteriorismo.sistema_interiorismo.repository;

import com.dlinteriorismo.sistema_interiorismo.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Integer> {
    List<Tarea> findAllByOrderByIdTareaDesc(Pageable pageable);
}