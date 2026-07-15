package com.dlinteriorismo.sistema_interiorismo.service;
<<<<<<< HEAD
=======

import com.dlinteriorismo.sistema_interiorismo.dto.ClienteDTO;
>>>>>>> master
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
<<<<<<< HEAD
@Service
public class ClienteService {
    private static final Logger logger =
            LoggerFactory.getLogger(ClienteService.class);
=======

@Service
public class ClienteService {
    private static final Logger logger = LoggerFactory.getLogger(ClienteService.class);
>>>>>>> master

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }

<<<<<<< HEAD
    public Cliente guardar(Cliente cliente) {
        var camposObligatorios = ImmutableList.of("nombre", "dni", "telefono");
        logger.info("Validando campos obligatorios: {}", camposObligatorios);

        if (Strings.isNullOrEmpty(cliente.getNombre())) {
=======
    public Cliente guardar(ClienteDTO clienteDTO) {
        var camposObligatorios = ImmutableList.of("nombre", "dni", "telefono");
        logger.info("Validando campos obligatorios: {}", camposObligatorios);

        if (Strings.isNullOrEmpty(clienteDTO.getNombre())) {
>>>>>>> master
            logger.warn("Intento de registrar cliente sin nombre");
            throw new RuntimeException("El nombre es obligatorio");
        }

<<<<<<< HEAD
        if (StringUtils.isBlank(cliente.getDni()) || cliente.getDni().length() != 8 || !StringUtils.isNumeric(cliente.getDni())) {
            logger.warn("DNI inválido: {}", cliente.getDni());
            throw new RuntimeException("El DNI debe tener 8 dígitos");
        }

        if (StringUtils.isBlank(cliente.getTelefono()) || cliente.getTelefono().length() != 9 || !StringUtils.isNumeric(cliente.getTelefono())) {
            logger.warn("Teléfono inválido: {}", cliente.getTelefono());
            throw new RuntimeException("El teléfono debe tener 9 dígitos");
        }

        if (StringUtils.isNotBlank(cliente.getCorreo())) {

            if (!EmailValidator.getInstance().isValid(cliente.getCorreo())) {
                logger.warn("Correo inválido: {}", cliente.getCorreo());
                throw new RuntimeException("Formato de correo inválido");
            }

            if (!cliente.getCorreo().toLowerCase().endsWith("@gmail.com")) {
                logger.warn("Correo no permitido: {}", cliente.getCorreo());
=======
        if (StringUtils.isBlank(clienteDTO.getDni())
                || clienteDTO.getDni().length() != 8
                || !StringUtils.isNumeric(clienteDTO.getDni())) {

            logger.warn("DNI inválido: {}", clienteDTO.getDni());
            throw new RuntimeException("El DNI debe tener 8 dígitos");
        }

        if (StringUtils.isBlank(clienteDTO.getTelefono())
                || clienteDTO.getTelefono().length() != 9
                || !StringUtils.isNumeric(clienteDTO.getTelefono())) {

            logger.warn("Teléfono inválido: {}", clienteDTO.getTelefono());
            throw new RuntimeException("El teléfono debe tener 9 dígitos");
        }

        if (StringUtils.isNotBlank(clienteDTO.getCorreo())) {

            if (!EmailValidator.getInstance().isValid(clienteDTO.getCorreo())) {
                logger.warn("Correo inválido: {}", clienteDTO.getCorreo());
                throw new RuntimeException("Formato de correo inválido");
            }

            if (!clienteDTO.getCorreo().toLowerCase().endsWith("@gmail.com")) {
                logger.warn("Correo no permitido: {}", clienteDTO.getCorreo());
>>>>>>> master
                throw new RuntimeException("El correo debe terminar en @gmail.com");
            }
        }

<<<<<<< HEAD
        logger.info("Cliente registrado correctamente: {}", cliente.getNombre());
=======
        Cliente cliente = new Cliente();
        cliente.setNombre(clienteDTO.getNombre());
        cliente.setDni(clienteDTO.getDni());
        cliente.setTelefono(clienteDTO.getTelefono());
        cliente.setCorreo(clienteDTO.getCorreo());
        cliente.setDireccion(clienteDTO.getDireccion());

        logger.info("Cliente registrado correctamente: {}", cliente.getNombre());

>>>>>>> master
        return clienteRepository.save(cliente);
    }

    public void eliminar(Integer id) {
        clienteRepository.deleteById(id);
    }
}
