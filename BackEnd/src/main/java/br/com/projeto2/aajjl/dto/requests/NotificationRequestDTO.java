package br.com.projeto2.aajjl.dto.requests;

public record NotificationRequestDTO(
        Long userNotifiedId,
        Long scheduleId,
        String texto
) {
}
