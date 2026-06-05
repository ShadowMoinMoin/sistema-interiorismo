package com.dlinteriorismo.sistema_interiorismo.service;

import com.dlinteriorismo.sistema_interiorismo.model.Cotizacion;
import com.dlinteriorismo.sistema_interiorismo.model.Factura;
import com.dlinteriorismo.sistema_interiorismo.repository.CotizacionRepository;
import com.dlinteriorismo.sistema_interiorismo.repository.FacturaRepository;
import com.google.common.base.Preconditions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FacturaService {

    private static final Logger logger =
            LoggerFactory.getLogger(FacturaService.class);

    private final FacturaRepository facturaRepository;
    private final CotizacionRepository cotizacionRepository;

    public FacturaService(FacturaRepository facturaRepository,
                          CotizacionRepository cotizacionRepository) {
        this.facturaRepository = facturaRepository;
        this.cotizacionRepository = cotizacionRepository;
    }

    public List<Factura> listar() {
        logger.info("Listando facturas");
        return facturaRepository.findAll();
    }

    public Factura guardar(Factura factura) {
        Preconditions.checkNotNull(factura.getIdCotizacion(), "La cotización es obligatoria");

        Cotizacion cotizacion = cotizacionRepository.findById(factura.getIdCotizacion())
                .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));

        factura.setFecha(LocalDate.now());
        factura.setTotal(cotizacion.getTotal());

        if (factura.getNumeroFactura() == null || factura.getNumeroFactura().isBlank()) {
            factura.setNumeroFactura("F-" + System.currentTimeMillis());
        }

        if (factura.getEstado() == null || factura.getEstado().isBlank()) {
            factura.setEstado("Pendiente");
        }

        logger.info("Factura generada para cotización ID: {}", factura.getIdCotizacion());
        if (facturaRepository.existsByIdCotizacion(factura.getIdCotizacion())) {
            throw new RuntimeException("Esta cotización ya tiene una factura generada");
        }

        return facturaRepository.save(factura);
    }

    public void eliminar(Integer id) {
        logger.info("Eliminando factura ID: {}", id);
        facturaRepository.deleteById(id);
    }

}