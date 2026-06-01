package com.dlinteriorismo.sistema_interiorismo.service;

import com.dlinteriorismo.sistema_interiorismo.model.Empleado;
import com.dlinteriorismo.sistema_interiorismo.repository.EmpleadoRepository;
import com.google.common.base.Strings;
import com.google.common.collect.ImmutableList;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.validator.routines.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoService {

    private static final Logger logger =
            LoggerFactory.getLogger(EmpleadoService.class);

    private final EmpleadoRepository empleadoRepository;

    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    public List<Empleado> listar() {
        logger.info("Listando empleados");
        return empleadoRepository.findAll();
    }

    public Empleado guardar(Empleado empleado) {

        var camposObligatorios = ImmutableList.of("nombre", "cargo", "telefono");
        logger.info("Validando campos obligatorios de empleado: {}", camposObligatorios);

        if (Strings.isNullOrEmpty(empleado.getNombre())) {
            logger.warn("Intento de registrar empleado sin nombre");
            throw new RuntimeException("El nombre es obligatorio");
        }

        if (Strings.isNullOrEmpty(empleado.getCargo())) {
            logger.warn("Intento de registrar empleado sin cargo");
            throw new RuntimeException("El cargo es obligatorio");
        }

        if (StringUtils.isBlank(empleado.getTelefono()) ||
                empleado.getTelefono().length() != 9 ||
                !StringUtils.isNumeric(empleado.getTelefono())) {
            logger.warn("Teléfono inválido: {}", empleado.getTelefono());
            throw new RuntimeException("El teléfono debe tener exactamente 9 dígitos");
        }

        if (StringUtils.isNotBlank(empleado.getCorreo()) &&
                !EmailValidator.getInstance().isValid(empleado.getCorreo())) {
            logger.warn("Correo inválido: {}", empleado.getCorreo());
            throw new RuntimeException("Correo inválido");
        }

        logger.info("Empleado registrado correctamente: {}", empleado.getNombre());
        return empleadoRepository.save(empleado);
    }

    public void eliminar(Integer id) {
        logger.info("Eliminando empleado con ID: {}", id);
        empleadoRepository.deleteById(id);
    }
}