package com.dlinteriorismo.sistema_interiorismo.controller;

<<<<<<< HEAD
=======
import com.dlinteriorismo.sistema_interiorismo.dto.ClienteDTO;
>>>>>>> master
import com.dlinteriorismo.sistema_interiorismo.model.Cliente;
import com.dlinteriorismo.sistema_interiorismo.service.ClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public List<Cliente> listar() {
        return clienteService.listar();
    }

    @PostMapping
<<<<<<< HEAD
    public Cliente guardar(@RequestBody Cliente cliente) {
        return clienteService.guardar(cliente);
=======
    public Cliente guardar(@RequestBody ClienteDTO clienteDTO) {
        return clienteService.guardar(clienteDTO);
>>>>>>> master
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        clienteService.eliminar(id);
    }
}