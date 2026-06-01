package com.dlinteriorismo.sistema_interiorismo.repository;

import com.dlinteriorismo.sistema_interiorismo.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaRepository extends JpaRepository<Factura, Integer> {
    boolean existsByIdCotizacion(Integer idCotizacion);
}