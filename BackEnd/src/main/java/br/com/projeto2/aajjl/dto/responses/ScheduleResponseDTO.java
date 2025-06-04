package br.com.projeto2.aajjl.dto.responses;

import br.com.projeto2.aajjl.model.Priority;
import br.com.projeto2.aajjl.model.Shift;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record ScheduleResponseDTO(
        Long id,
        Boolean concluido,
        ResponseDTO user,
        PatientResponseDTO paciente,
        Shift turno,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime dataAgendamento,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime dataCriacao,
        String observacao,
        String motivoDoAtendimento,
        Priority prioridade
) {
}