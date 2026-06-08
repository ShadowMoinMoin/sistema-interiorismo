package com.dlinteriorismo.sistema_interiorismo.service;

import com.dlinteriorismo.sistema_interiorismo.dto.DashboardDTO;
import com.dlinteriorismo.sistema_interiorismo.repository.*;
import org.springframework.stereotype.Service;
import com.dlinteriorismo.sistema_interiorismo.model.Proyecto;
import org.springframework.data.domain.PageRequest;
import java.util.List;
import com.dlinteriorismo.sistema_interiorismo.model.Tarea;

@Service
public class DashboardService {

    private final ProyectoRepository proyectoRepository;
    private final CotizacionRepository cotizacionRepository;
    private final FacturaRepository facturaRepository;
    private final PagoRepository pagoRepository;
    private final TareaRepository tareaRepository;

    public DashboardService(
            ProyectoRepository proyectoRepository,
            CotizacionRepository cotizacionRepository,
            FacturaRepository facturaRepository,
            PagoRepository pagoRepository,
            TareaRepository tareaRepository) {

        this.proyectoRepository = proyectoRepository;
        this.cotizacionRepository = cotizacionRepository;
        this.facturaRepository = facturaRepository;
        this.pagoRepository = pagoRepository;
        this.tareaRepository = tareaRepository;
    }

    public DashboardDTO obtenerResumen() {

        DashboardDTO dto = new DashboardDTO();

        dto.setTotalProyectos(proyectoRepository.count());
        dto.setTotalCotizaciones(cotizacionRepository.count());
        dto.setTotalFacturas(facturaRepository.count());
        dto.setTotalPagos(pagoRepository.count());
        dto.setTotalTareas(tareaRepository.count());
        dto.setProyectosPendientes(
                proyectoRepository.countByEstado("Pendiente")
        );

        dto.setProyectosEnProceso(
                proyectoRepository.countByEstado("En Proceso")
        );

        dto.setProyectosCompletados(
                proyectoRepository.countByEstado("Finalizado")
        );

        dto.setProyectosCancelados(
                proyectoRepository.countByEstado("Cancelado")
        );

        return dto;
    }
    public List<Proyecto> obtenerProyectosRecientes(){

        return proyectoRepository
                .findAllByOrderByIdProyectoDesc(
                        PageRequest.of(0,5)
                );
    }
    public List<Tarea> obtenerTareasPendientes(){

        return tareaRepository
                .findAllByOrderByIdTareaDesc(
                        PageRequest.of(0,5)
                );
    }
}