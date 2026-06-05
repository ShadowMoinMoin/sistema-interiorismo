package com.dlinteriorismo.sistema_interiorismo.controller;

import com.dlinteriorismo.sistema_interiorismo.model.Tarea;
import com.dlinteriorismo.sistema_interiorismo.service.TareaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "*")
public class TareaController {

    private final TareaService tareaService;

    public TareaController(TareaService tareaService) {
        this.tareaService = tareaService;
    }

    @GetMapping
    public List<Tarea> listar() {
        return tareaService.listar();
    }

    @PostMapping
    public Tarea guardar(@RequestBody Tarea tarea) {
        return tareaService.guardar(tarea);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        tareaService.eliminar(id);
    }
}