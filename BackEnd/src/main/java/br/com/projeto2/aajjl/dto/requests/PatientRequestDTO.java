package br.com.projeto2.aajjl.dto.requests;

import br.com.projeto2.aajjl.model.Priority;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

public record PatientRequestDTO(

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
        Long cadastradoPorId,
        Boolean ativo
) {
}
