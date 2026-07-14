package com.dlinteriorismo.sistema_interiorismo.controller;

import com.dlinteriorismo.sistema_interiorismo.dto.DashboardDTO;
import com.dlinteriorismo.sistema_interiorismo.service.DashboardService;
import org.springframework.web.bind.annotation.*;
import com.dlinteriorismo.sistema_interiorismo.model.Proyecto;
import java.util.List;
import com.dlinteriorismo.sistema_interiorismo.model.Tarea;
@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public DashboardDTO obtenerResumen() {
        return dashboardService.obtenerResumen();
    }
    @GetMapping("/proyectos")
    public List<Proyecto> obtenerProyectosRecientes(){

        return dashboardService.obtenerProyectosRecientes();
    }
    @GetMapping("/tareas")
    public List<Tarea> obtenerTareasPendientes(){

        return dashboardService.obtenerTareasPendientes();

    }
}