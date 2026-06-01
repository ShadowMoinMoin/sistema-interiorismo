package com.dlinteriorismo.sistema_interiorismo.repository;

import com.dlinteriorismo.sistema_interiorismo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByUsuarioAndPassword(String usuario, String password);
}
