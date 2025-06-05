package br.com.projeto2.aajjl.controller;

import br.com.projeto2.aajjl.dto.requests.PatientRequestDTO;
import br.com.projeto2.aajjl.dto.responses.PatientResponseDTO;
import br.com.projeto2.aajjl.model.Patient;
import br.com.projeto2.aajjl.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pacientes") //Tem que verificar se vai ser esse o EndPoit mesmo
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping
    public ResponseEntity<PatientResponseDTO> create(@RequestBody PatientRequestDTO newPatient) {
        PatientResponseDTO patientResponseDTO = patientService.create(new Patient(newPatient));
        return ResponseEntity.ok(patientResponseDTO);
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getAll() {
        return ResponseEntity.ok(patientService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getById(@PathVariable Long id) {
        Optional<Patient> foundPatient = patientService.getById(id);
        return foundPatient.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> update(@PathVariable Long id, @RequestBody Patient oldPatient) {
        Optional<Patient> updated = patientService.update(id, oldPatient);
        return updated.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = patientService.delete(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
