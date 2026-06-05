package com.dlinteriorismo.sistema_interiorismo.service;

import com.dlinteriorismo.sistema_interiorismo.model.Tarea;
import com.dlinteriorismo.sistema_interiorismo.repository.EmpleadoRepository;
import com.dlinteriorismo.sistema_interiorismo.repository.ProyectoRepository;
import com.dlinteriorismo.sistema_interiorismo.repository.TareaRepository;
import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TareaService {

    private static final Logger logger =
            LoggerFactory.getLogger(TareaService.class);

    private final TareaRepository tareaRepository;
    private final ProyectoRepository proyectoRepository;
    private final EmpleadoRepository empleadoRepository;

    public TareaService(
            TareaRepository tareaRepository,
            ProyectoRepository proyectoRepository,
            EmpleadoRepository empleadoRepository) {
        this.tareaRepository = tareaRepository;
        this.proyectoRepository = proyectoRepository;
        this.empleadoRepository = empleadoRepository;
    }

    public List<Tarea> listar() {
        logger.info("Listando tareas");
        return tareaRepository.findAll();
    }

    public Tarea guardar(Tarea tarea) {
        Preconditions.checkNotNull(tarea.getIdProyecto(), "El proyecto es obligatorio");
        Preconditions.checkArgument(proyectoRepository.existsById(tarea.getIdProyecto()), "El proyecto no existe");

        Preconditions.checkNotNull(tarea.getIdEmpleado(), "El empleado es obligatorio");
        Preconditions.checkArgument(empleadoRepository.existsById(tarea.getIdEmpleado()), "El empleado no existe");

        if (Strings.isNullOrEmpty(tarea.getDescripcion())) {
            throw new RuntimeException("La descripción es obligatoria");
        }

        if (tarea.getEstado() == null || tarea.getEstado().isBlank()) {
            tarea.setEstado("Pendiente");
        }

        logger.info("Tarea registrada para proyecto ID: {}", tarea.getIdProyecto());
        return tareaRepository.save(tarea);
    }

    public void eliminar(Integer id) {
        logger.info("Eliminando tarea ID: {}", id);
        tareaRepository.deleteById(id);
    }
}