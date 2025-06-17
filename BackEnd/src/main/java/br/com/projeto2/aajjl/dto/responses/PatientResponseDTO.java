package br.com.projeto2.aajjl.dto.responses;

import br.com.projeto2.aajjl.model.Patient; // Importe a entidade Patient
import br.com.projeto2.aajjl.model.Priority;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

public record PatientResponseDTO(
        Long id,
        String nome,
        String cpf,
        String email,
        String doenca,
        String observacao,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate dataNascimento,
        String cep,
        String rua,
        String numero,
        String bairro,
        String complemento,
        String cidade,
        String estado,
        Priority prioridade,
        Boolean ativo
       // UserInfoDTO cadastradoPor
) {
        public record UserInfoDTO(Long id, String nome) {}

        public static PatientResponseDTO fromEntity(Patient patient) {
                return new PatientResponseDTO(
                        patient.getId(),
                        patient.getNome(),
                        patient.getCpf(),
                        patient.getEmail(),
                        patient.getDoenca(),
                        patient.getObservacao(),
                        patient.getDataNascimento(),
                        patient.getCep(),
                        patient.getRua(),
                        patient.getNumero(),
                        patient.getBairro(),
                        patient.getComplemento(),
                        patient.getCidade(),
                        patient.getEstado(),
                        patient.getPrioridade(),
                        patient.getAtivo()
                       // new UserInfoDTO(patient.getCadastradoPor().getId(), patient.getCadastradoPor().getNome())
                );
        }
}