package com.dlinteriorismo.sistema_interiorismo.controller;

import com.dlinteriorismo.sistema_interiorismo.model.Factura;
import com.dlinteriorismo.sistema_interiorismo.service.FacturaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facturas")
@CrossOrigin(origins = "*")
public class FacturaController {

    private final FacturaService facturaService;

    public FacturaController(FacturaService facturaService) {
        this.facturaService = facturaService;
    }

    @GetMapping
    public List<Factura> listar() {
        return facturaService.listar();
    }

    @PostMapping
    public Factura guardar(@RequestBody Factura factura) {
        return facturaService.guardar(factura);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        facturaService.eliminar(id);
    }
}