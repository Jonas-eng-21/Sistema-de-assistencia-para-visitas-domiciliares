package br.com.projeto2.aajjl.service;

import br.com.projeto2.aajjl.dto.requests.PatientRequestDTO;
import br.com.projeto2.aajjl.dto.responses.PatientResponseDTO;
import br.com.projeto2.aajjl.dto.responses.ResponseDTO;
import br.com.projeto2.aajjl.model.Patient;
import br.com.projeto2.aajjl.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.projeto2.aajjl.model.User;
import br.com.projeto2.aajjl.repository.UserRepository;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private EmailSenderService emailService;

    @Autowired
    private UserRepository userRepository;

    public Patient create(PatientRequestDTO requestDTO) {

        System.out.println("  cheguei no inicio do metodo Paciente agr " );

//        User professional = userRepository.findById(requestDTO.cadastradoPorId())
//                .orElseThrow(() -> new RuntimeException("Usuário profissional não encontrado com ID: " + requestDTO.cadastradoPorId()));

        System.out.println("  cheguei na parte do NEW Paciente agr " );

        Patient newPatient = new Patient();

        newPatient.setNome(requestDTO.nome());
        newPatient.setCpf(requestDTO.cpf());
        newPatient.setEmail(requestDTO.email());
        newPatient.setDataNascimento(requestDTO.dataNascimento());
        newPatient.setDoenca(requestDTO.doenca());
        newPatient.setObservacao(requestDTO.observacao());
        newPatient.setPrioridade(requestDTO.prioridade());
        newPatient.setCep(requestDTO.cep());
        newPatient.setRua(requestDTO.rua());
        newPatient.setNumero(requestDTO.numero());
        newPatient.setBairro(requestDTO.bairro());
        newPatient.setComplemento(requestDTO.complemento());
        newPatient.setCidade(requestDTO.cidade());
        newPatient.setEstado(requestDTO.estado());
        newPatient.setAtivo(true);
        //newPatient.setCadastradoPor(professional);

        System.out.println(" NEW Paciente salvo com ID: " + newPatient.getId() +"  " + newPatient.getNome() + " e " + newPatient.getEmail());
        System.out.println("  vou salvar o NEW Paciente agr " );

        Patient savedPatient = patientRepository.save(newPatient);

        System.out.println("  sSalvei o NEW Paciente agr " );
        System.out.println(" NEW Paciente salvo com ID: " + savedPatient.getId() +"  " + savedPatient.getNome() + " e " + savedPatient.getEmail());


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

