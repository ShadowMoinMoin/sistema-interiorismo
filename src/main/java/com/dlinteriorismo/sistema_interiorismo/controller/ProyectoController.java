package com.dlinteriorismo.sistema_interiorismo.controller;
import com.dlinteriorismo.sistema_interiorismo.model.Proyecto;
import com.dlinteriorismo.sistema_interiorismo.service.ProyectoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/proyectos")
@CrossOrigin(origins = "*")
public class ProyectoController {

    private final ProyectoService proyectoService;

    public ProyectoController(
            ProyectoService proyectoService) {
        this.proyectoService = proyectoService;
    }

    @GetMapping
    public List<Proyecto> listar() {
        return proyectoService.listar();
    }

    @PostMapping
    public Proyecto guardar(
            @RequestBody Proyecto proyecto) {

        return proyectoService.guardar(proyecto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Integer id) {

        proyectoService.eliminar(id);
    }
}