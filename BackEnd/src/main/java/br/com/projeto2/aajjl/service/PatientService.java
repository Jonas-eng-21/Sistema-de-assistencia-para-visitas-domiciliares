package br.com.projeto2.aajjl.service;

import br.com.projeto2.aajjl.dto.requests.PatientRequestDTO;
import br.com.projeto2.aajjl.dto.responses.PatientResponseDTO;
import br.com.projeto2.aajjl.dto.responses.ResponseDTO;
import br.com.projeto2.aajjl.model.Patient;
import br.com.projeto2.aajjl.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private EmailSenderService emailService;

    public PatientResponseDTO create(Patient newPatient) {
        newPatient.setAtivo(true);
        Patient savedPatient = patientRepository.save(newPatient);

        // Envia o e-mail de boas-vindas
        emailService.enviarEmailSimples(
                savedPatient.getEmail(),
                "Bem-vindo ao Sistema de assistencia para visitas domiciliares",
                "Olá " + savedPatient.getNome() + ", seu cadastro como paciente foi realizado com sucesso!"
        );

        return new PatientResponseDTO(
                newPatient.getId(),
                newPatient.getNome(),
                newPatient.getCpf(),
                newPatient.getEmail(),
                newPatient.getDoenca(),
                newPatient.getObservacao(),
                newPatient.getDataNascimento(),
                newPatient.getCep(),
                newPatient.getRua(),
                newPatient.getNumero(),
                newPatient.getBairro(),
                newPatient.getComplemento(),
                newPatient.getCidade(),
                newPatient.getEstado(),
                newPatient.getPrioridade(),
                newPatient.getAtivo(),
                newPatient.getCadastradoPor()
        );
    }

    public List<Patient> getAll() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getById(Long id) {
        return patientRepository.findById(id);
    }


    public Optional<Patient> update(Long id, Patient novo) {

        Patient atual = patientRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Não foi possível atualizar: paciente " + id + " não encontrado."));

        for (Field field : Patient.class.getDeclaredFields()) {
            field.setAccessible(true);

            if ("id".equals(field.getName())) {
                continue;
            }

            try {
                Object novoValor = field.get(novo);

                if (novoValor == null) {
                    continue;
                }
                if (novoValor instanceof String str && str.trim().isEmpty()) {
                    continue;
                }

                if (novoValor instanceof String str) {
                    novoValor = str.trim();
                }

                field.set(atual, novoValor);

            } catch (IllegalAccessException e) {
                throw new RuntimeException(
                        "Erro ao atualizar o campo " + field.getName(), e);
            }
        }

        return Optional.of(patientRepository.save(atual));
    }


public boolean delete(Long id) {
        return patientRepository.findById(id).map(patient -> {
            patient.setAtivo(false); //Aqui eu nao deleto do BD, eu atualizo o atributo para false
            patientRepository.save(patient);
            return true;
        }).orElse(false);
    }

    public List<Patient> getAllAtivos() {
        return patientRepository.findByAtivoTrue();
    }

    public List<Patient> getAllInativos() {
        return patientRepository.findByAtivoFalse();
    }

    public List<Patient> findByNome(String nome) {
        return patientRepository.findByNome(nome)
                .stream()
                .filter(Patient::getAtivo)
                .toList();
    }

}

