package com.dlinteriorismo.sistema_interiorismo.service;
import com.dlinteriorismo.sistema_interiorismo.model.Cliente;
import com.dlinteriorismo.sistema_interiorismo.repository.ClienteRepository;
import com.google.common.base.Strings;
import com.google.common.collect.ImmutableList;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.validator.routines.EmailValidator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClienteService {
    private static final Logger logger =
            LoggerFactory.getLogger(ClienteService.class);

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }

    public Cliente guardar(Cliente cliente) {
        var camposObligatorios = ImmutableList.of("nombre", "dni", "telefono");
        logger.info("Validando campos obligatorios: {}", camposObligatorios);

        if (Strings.isNullOrEmpty(cliente.getNombre())) {
            logger.warn("Intento de registrar cliente sin nombre");
            throw new RuntimeException("El nombre es obligatorio");
        }

        if (StringUtils.isBlank(cliente.getDni()) || cliente.getDni().length() != 8 || !StringUtils.isNumeric(cliente.getDni())) {
            logger.warn("DNI inválido: {}", cliente.getDni());
            throw new RuntimeException("El DNI debe tener 8 dígitos");
        }

        if (StringUtils.isBlank(cliente.getTelefono()) || cliente.getTelefono().length() != 9 || !StringUtils.isNumeric(cliente.getTelefono())) {
            logger.warn("Teléfono inválido: {}", cliente.getTelefono());
            throw new RuntimeException("El teléfono debe tener 9 dígitos");
        }

        if (StringUtils.isNotBlank(cliente.getCorreo()) &&
                !EmailValidator.getInstance().isValid(cliente.getCorreo())) {
            logger.warn("Correo inválido: {}", cliente.getCorreo());
            throw new RuntimeException("Correo inválido");
        }

        logger.info("Cliente registrado correctamente: {}", cliente.getNombre());
        return clienteRepository.save(cliente);
    }

    public void eliminar(Integer id) {
        clienteRepository.deleteById(id);
    }
}
