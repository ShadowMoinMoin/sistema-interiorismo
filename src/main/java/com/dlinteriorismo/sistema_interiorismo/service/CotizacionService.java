package com.dlinteriorismo.sistema_interiorismo.service;

import com.dlinteriorismo.sistema_interiorismo.model.Cotizacion;
import com.dlinteriorismo.sistema_interiorismo.repository.CotizacionRepository;
import com.google.common.base.Preconditions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class CotizacionService {

    private static final Logger logger =
            LoggerFactory.getLogger(CotizacionService.class);

    private final CotizacionRepository cotizacionRepository;

    public CotizacionService(CotizacionRepository cotizacionRepository) {
        this.cotizacionRepository = cotizacionRepository;
    }

    public List<Cotizacion> listar() {
        logger.info("Listando cotizaciones");
        return cotizacionRepository.findAll();
    }

    public Cotizacion guardar(Cotizacion cotizacion) {

        Preconditions.checkNotNull(cotizacion.getIdProyecto(), "El proyecto es obligatorio");
        Preconditions.checkArgument(cotizacion.getMetraje() != null, "El metraje es obligatorio");
        Preconditions.checkArgument(cotizacion.getMetraje().compareTo(BigDecimal.ZERO) > 0, "El metraje debe ser mayor a 0");

        BigDecimal metraje = cotizacion.getMetraje();

        BigDecimal melamina = metraje.multiply(new BigDecimal("308"));
        BigDecimal correderas = metraje.multiply(new BigDecimal("15"));
        BigDecimal bisagras = metraje.multiply(new BigDecimal("10"));
        BigDecimal tornillos = metraje.multiply(new BigDecimal("20"));
        BigDecimal transporte = new BigDecimal("30");
        BigDecimal manoObra = new BigDecimal("100");

        BigDecimal subtotal = melamina
                .add(correderas)
                .add(bisagras)
                .add(tornillos)
                .add(transporte)
                .add(manoObra);

        BigDecimal ganancia = subtotal.multiply(new BigDecimal("0.80"));
        BigDecimal total = subtotal.add(ganancia);

        cotizacion.setFecha(LocalDate.now());
        cotizacion.setSubtotal(subtotal);
        cotizacion.setGanancia(ganancia);
        cotizacion.setTotal(total);

        if (cotizacion.getEstado() == null || cotizacion.getEstado().isBlank()) {
            cotizacion.setEstado("Pendiente");
        }

        logger.info("Cotización registrada para proyecto ID: {}", cotizacion.getIdProyecto());

        return cotizacionRepository.save(cotizacion);
    }

    public void eliminar(Integer id) {
        logger.info("Eliminando cotización ID: {}", id);
        cotizacionRepository.deleteById(id);
    }
}