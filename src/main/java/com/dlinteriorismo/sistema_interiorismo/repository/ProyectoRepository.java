package com.dlinteriorismo.sistema_interiorismo.repository;

import com.dlinteriorismo.sistema_interiorismo.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ProyectoRepository extends JpaRepository<Proyecto,Integer> {
    List<Proyecto> findAllByOrderByIdProyectoDesc(Pageable pageable);
    Long countByEstado(String estado);
}