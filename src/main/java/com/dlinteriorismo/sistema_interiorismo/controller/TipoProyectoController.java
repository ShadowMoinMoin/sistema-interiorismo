package com.dlinteriorismo.sistema_interiorismo.controller;

import com.dlinteriorismo.sistema_interiorismo.model.TipoProyecto;
import com.dlinteriorismo.sistema_interiorismo.repository.TipoProyectoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-proyecto")
@CrossOrigin(origins = "*")
public class TipoProyectoController {

    private final TipoProyectoRepository tipoProyectoRepository;

    public TipoProyectoController(TipoProyectoRepository tipoProyectoRepository) {
        this.tipoProyectoRepository = tipoProyectoRepository;
    }

    @GetMapping
    public List<TipoProyecto> listar() {
        return tipoProyectoRepository.findAll();
    }
}