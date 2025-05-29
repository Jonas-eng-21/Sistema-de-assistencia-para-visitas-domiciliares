package br.com.projeto2.aajjl.dto.responses;

public record NotificationResponseDTO(
        Long id,
        ResponseDTO userNotified,
        ScheduleResponseDTO schedule,
        String texto,
        Boolean visto
) {
}