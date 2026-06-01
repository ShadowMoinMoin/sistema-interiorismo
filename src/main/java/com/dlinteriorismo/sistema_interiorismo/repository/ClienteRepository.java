package com.dlinteriorismo.sistema_interiorismo.repository;
import com.dlinteriorismo.sistema_interiorismo.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
}
