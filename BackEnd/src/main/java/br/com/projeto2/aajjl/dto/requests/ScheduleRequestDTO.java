package br.com.projeto2.aajjl.dto.requests;

import br.com.projeto2.aajjl.model.Priority;
import br.com.projeto2.aajjl.model.Shift;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

public record ScheduleRequestDTO(
        Long userId,
        Long pacienteId,
        Shift turno,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate dataAgendamento,
        String observacao,
        String motivoDoAtendimento,
        Priority prioridade
) {
}