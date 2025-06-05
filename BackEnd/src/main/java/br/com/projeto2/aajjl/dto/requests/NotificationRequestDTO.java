package br.com.projeto2.aajjl.dto.requests;

import br.com.projeto2.aajjl.model.Schedule;
import br.com.projeto2.aajjl.model.User;

public record NotificationRequestDTO(
        User userNotifiedId,
        Schedule scheduleId,
        String texto
) {
}
