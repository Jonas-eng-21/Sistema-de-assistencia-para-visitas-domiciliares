package br.com.projeto2.aajjl.dto.responses;

public record NotificationResponseDTO(
        Long id,
        br.com.projeto2.aajjl.model.User userNotified,
        br.com.projeto2.aajjl.model.Schedule schedule,
        String texto,
        Boolean visto
) {
}