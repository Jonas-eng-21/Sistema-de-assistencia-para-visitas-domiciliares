package br.com.projeto2.aajjl.repository;


import br.com.projeto2.aajjl.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    List<Paciente> findByNome(String nome);
    List<Paciente> findByAtivoTrue();
    List<Paciente> findByAtivoFalse();
}
