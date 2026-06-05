package com.dlinteriorismo.sistema_interiorismo.service;

import com.dlinteriorismo.sistema_interiorismo.model.Proyecto;
import com.dlinteriorismo.sistema_interiorismo.repository.ProyectoRepository;
import com.google.common.base.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProyectoService {

    private static final Logger logger =
            LoggerFactory.getLogger(ProyectoService.class);

    private final ProyectoRepository proyectoRepository;

    public ProyectoService(ProyectoRepository proyectoRepository) {
        this.proyectoRepository = proyectoRepository;
    }

    public List<Proyecto> listar() {
        logger.info("Listando proyectos");
        return proyectoRepository.findAll();
    }

    public Proyecto guardar(Proyecto proyecto) {

        if (Strings.isNullOrEmpty(proyecto.getNombreProyecto())) {
            throw new RuntimeException("Nombre obligatorio");
        }

        logger.info(
                "Proyecto registrado: {}",
                proyecto.getNombreProyecto()
        );

        return proyectoRepository.save(proyecto);
    }

    public void eliminar(Integer id) {
        proyectoRepository.deleteById(id);
    }
}