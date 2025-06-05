package br.com.projeto2.aajjl.model;

import br.com.projeto2.aajjl.dto.requests.NotificationRequestDTO;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Notification")
@NoArgsConstructor
@Getter
@Setter
public class Notification {

    // Atributos do sistema
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    @Setter(AccessLevel.NONE)
    private Long id;

    // Atributos de relacionamento de tabelas no BD
    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private Schedule schedule_id; // id de schedule origem da notificação

    // Relacionamento correto com User
    @ManyToOne
    @JoinColumn(name = "userNotified")
    private User userNotified;

    // Atributo para notificação vista. Default = false
    private Boolean visto;

    // Descrição da notificação
    private String texto;

    // Construtor completo
    public Notification(NotificationRequestDTO notificationRequestDTO) {
        this.userNotified = notificationRequestDTO.userNotifiedId();
        this.schedule_id = notificationRequestDTO.scheduleId();
        this.texto = notificationRequestDTO.texto();
        this.visto = false;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "visto=" + visto +
                ", user_id=" + userNotified +
                ", schedule_id='" + schedule_id + '\'' +
                ", texto='" + texto + '\'' +
                '}';
    }
}
