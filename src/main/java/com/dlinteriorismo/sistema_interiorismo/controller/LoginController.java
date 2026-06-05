package com.dlinteriorismo.sistema_interiorismo.controller;
import com.dlinteriorismo.sistema_interiorismo.model.Usuario;
import com.dlinteriorismo.sistema_interiorismo.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*")
public class LoginController {
    private final UsuarioRepository usuarioRepository;

    public LoginController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    public String login(@RequestBody Usuario usuario) {
        Optional<Usuario> encontrado = usuarioRepository.findByUsuarioAndPassword(
                usuario.getUsuario(),
                usuario.getPassword()
        );

        if (encontrado.isPresent()) {
            return "Acceso correcto";
        } else {
            return "Usuario o contraseña incorrectos";
        }
    }
}
