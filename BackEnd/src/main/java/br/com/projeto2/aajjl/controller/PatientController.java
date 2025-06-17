package br.com.projeto2.aajjl.controller;

import br.com.projeto2.aajjl.dto.requests.PatientRequestDTO;
import br.com.projeto2.aajjl.dto.responses.PatientResponseDTO;
import br.com.projeto2.aajjl.model.Patient;
import br.com.projeto2.aajjl.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pacientes") //Tem que verificar se vai ser esse o EndPoit mesmo
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping
    public ResponseEntity<PatientResponseDTO> create(@RequestBody PatientRequestDTO requestDTO) {
        // 1. O Controller passa o DTO de requisição DIRETAMENTE para o serviço.
        Patient savedPatient = patientService.create(requestDTO);

        // 2. O Controller converte a ENTIDADE retornada pelo serviço para o DTO de RESPOSTA.
        PatientResponseDTO responseDTO = PatientResponseDTO.fromEntity(savedPatient);

        // 3. Retorna o DTO de resposta com o status HTTP 201 Created.
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping
    public ResponseEntity<List<PatientResponseDTO>> getAll() {
        // 1. Pega a lista de entidades do serviço.
        List<Patient> patients = patientService.getAllAtivos(); // Usando seu método para pegar apenas ativos

        // 2. Converte a lista de entidades para uma lista de DTOs de resposta.
        List<PatientResponseDTO> responseDTOs = patients.stream()
                .map(PatientResponseDTO::fromEntity) // Usa o método de fábrica para cada item
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientResponseDTO> getById(@PathVariable Long id) {
        return patientService.getById(id)
                .map(patient -> ResponseEntity.ok(PatientResponseDTO.fromEntity(patient)))
                .orElse(ResponseEntity.notFound().build());
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
