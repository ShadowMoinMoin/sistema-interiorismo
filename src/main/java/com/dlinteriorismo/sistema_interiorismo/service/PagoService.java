package com.dlinteriorismo.sistema_interiorismo.service;

import com.dlinteriorismo.sistema_interiorismo.model.Pago;
import com.dlinteriorismo.sistema_interiorismo.repository.FacturaRepository;
import com.dlinteriorismo.sistema_interiorismo.repository.PagoRepository;
import com.google.common.base.Preconditions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class PagoService {

    private static final Logger logger =
            LoggerFactory.getLogger(PagoService.class);

    private final PagoRepository pagoRepository;
    private final FacturaRepository facturaRepository;

    public PagoService(PagoRepository pagoRepository, FacturaRepository facturaRepository) {
        this.pagoRepository = pagoRepository;
        this.facturaRepository = facturaRepository;
    }

    public List<Pago> listar() {
        logger.info("Listando pagos");
        return pagoRepository.findAll();
    }

    public Pago guardar(Pago pago) {
        Preconditions.checkNotNull(pago.getIdFactura(), "La factura es obligatoria");
        Preconditions.checkArgument(facturaRepository.existsById(pago.getIdFactura()), "La factura no existe");
        Preconditions.checkArgument(pago.getMonto() != null, "El monto es obligatorio");
        Preconditions.checkArgument(pago.getMonto().compareTo(BigDecimal.ZERO) > 0, "El monto debe ser mayor a 0");

        pago.setFechaPago(LocalDate.now());

        logger.info("Pago registrado para factura ID: {}", pago.getIdFactura());
        return pagoRepository.save(pago);
    }

    public void eliminar(Integer id) {
        logger.info("Eliminando pago ID: {}", id);
        pagoRepository.deleteById(id);
    }
}