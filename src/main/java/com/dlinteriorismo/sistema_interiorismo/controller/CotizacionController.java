package com.dlinteriorismo.sistema_interiorismo.controller;

import com.dlinteriorismo.sistema_interiorismo.model.Cotizacion;
import com.dlinteriorismo.sistema_interiorismo.service.CotizacionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cotizaciones")
@CrossOrigin(origins = "*")
public class CotizacionController {

    private final CotizacionService cotizacionService;

    public CotizacionController(CotizacionService cotizacionService) {
        this.cotizacionService = cotizacionService;
    }

    @GetMapping
    public List<Cotizacion> listar() {
        return cotizacionService.listar();
    }

    @PostMapping
    public Cotizacion guardar(@RequestBody Cotizacion cotizacion) {
        return cotizacionService.guardar(cotizacion);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        cotizacionService.eliminar(id);
    }
}