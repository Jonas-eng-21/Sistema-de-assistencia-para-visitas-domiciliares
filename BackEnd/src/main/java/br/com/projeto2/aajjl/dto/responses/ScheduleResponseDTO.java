package br.com.projeto2.aajjl.dto.responses;

import br.com.projeto2.aajjl.model.Patient;
import br.com.projeto2.aajjl.model.Priority;
import br.com.projeto2.aajjl.model.Schedule;
import br.com.projeto2.aajjl.model.Shift;
import br.com.projeto2.aajjl.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ScheduleResponseDTO(
        Long id,
        Boolean concluido,
        UserInfoDTO user,
        PatientInfoDTO paciente,
        Shift turno,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate dataAgendamento,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime dataCriacao,
        String observacao,
        String motivoDoAtendimento,
        Priority prioridade
) {
        public record UserInfoDTO(Long id, String nome, String profissao) {}

        public record PatientInfoDTO(Long id, String nome) {}

        public static ScheduleResponseDTO fromEntity(Schedule schedule) {
                return new ScheduleResponseDTO(
                        schedule.getId(),
                        schedule.getConcluido(),
                        new UserInfoDTO(schedule.getUser().getId(), schedule.getUser().getNome(), schedule.getUser().getProfissao().name()),
                        new PatientInfoDTO(schedule.getPaciente().getId(), schedule.getPaciente().getNome()),
                        schedule.getTurno(),
                        schedule.getDataAgendamento(),
                        schedule.getDataCriacao(),
                        schedule.getObservacao(),
                        schedule.getMotivoDoAtendimento(),
                        schedule.getPrioridade()
                );
        }
}