package com.dlinteriorismo.sistema_interiorismo.controller;

import com.dlinteriorismo.sistema_interiorismo.model.Pago;
import com.dlinteriorismo.sistema_interiorismo.service.PagoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "*")
public class PagoController {

    private final PagoService pagoService;

    public PagoController(PagoService pagoService) {
        this.pagoService = pagoService;
    }

    @GetMapping
    public List<Pago> listar() {
        return pagoService.listar();
    }

    @PostMapping
    public Pago guardar(@RequestBody Pago pago) {
        return pagoService.guardar(pago);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        pagoService.eliminar(id);
    }
}