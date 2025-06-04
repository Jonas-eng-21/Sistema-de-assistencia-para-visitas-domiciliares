package br.com.projeto2.aajjl.service;

import br.com.projeto2.aajjl.model.Patient;
import br.com.projeto2.aajjl.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private EmailSenderService emailService;

    public Patient create(Patient newPatient) {
        newPatient.setAtivo(true);
        Patient savedPatient = patientRepository.save(newPatient);

        // Envia o e-mail de boas-vindas
        emailService.enviarEmailSimples(
                savedPatient.getEmail(),
                "Bem-vindo ao Sistema de assistencia para visitas domiciliares",
                "Olá " + savedPatient.getNome() + ", seu cadastro como paciente foi realizado com sucesso!"
        );

        return savedPatient;
    }

    public List<Patient> getAll() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getById(Long id) {
        return patientRepository.findById(id);
    }


    public Optional<Patient> update(Long id, Patient newData) {
        return patientRepository.findById(id).map(patient -> {

            if (newData.getNome() != null && !newData.getNome().trim().isEmpty()) {
                patient.setNome(newData.getNome().trim());
            }
            if (newData.getCpf() != null && !newData.getCpf().trim().isEmpty()) {
                patient.setCpf(newData.getCpf().trim());
            }
            if (newData.getEmail() != null && !newData.getEmail().trim().isEmpty()) {
                patient.setEmail(newData.getEmail().trim());
            }
            if (newData.getDoenca() != null && !newData.getDoenca().trim().isEmpty()) {
                patient.setDoenca(newData.getDoenca().trim());
            }
            if (newData.getObservacao() != null && !newData.getObservacao().trim().isEmpty()) {
                patient.setObservacao(newData.getObservacao().trim());
            }
            if (newData.getCep() != null && !newData.getCep().trim().isEmpty()) {
                patient.setCep(newData.getCep().trim());
            }
            if (newData.getRua() != null && !newData.getRua().trim().isEmpty()) {
                patient.setRua(newData.getRua().trim());
            }
            if (newData.getNumero() != null && !newData.getNumero().trim().isEmpty()) {
                patient.setNumero(newData.getNumero().trim());
            }
            if (newData.getBairro() != null && !newData.getBairro().trim().isEmpty()) {
                patient.setBairro(newData.getBairro().trim());
            }
            if (newData.getComplemento() != null && !newData.getComplemento().trim().isEmpty()) {
                patient.setComplemento(newData.getComplemento().trim());
            }
            if (newData.getCidade() != null && !newData.getCidade().trim().isEmpty()) {
                patient.setCidade(newData.getCidade().trim());
            }
            if (newData.getEstado() != null && !newData.getEstado().trim().isEmpty()) {
                patient.setEstado(newData.getEstado().trim());
            }
            if (newData.getPrioridade() != null) {
                patient.setPrioridade(newData.getPrioridade());
            }

            return patientRepository.save(patient);
        });
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

