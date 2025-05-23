package br.com.projeto2.aajjl.repository;


import br.com.projeto2.aajjl.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByNome(String nome);
    List<Patient> findByAtivoTrue();
    List<Patient> findByAtivoFalse();
}
