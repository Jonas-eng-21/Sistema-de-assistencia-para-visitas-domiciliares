package br.com.projeto2.aajjl.model;

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
    private User schedule_id; // id de schedule origem da notificação

    // Relacionamento correto com User
    @ManyToOne
    @JoinColumn(name = "userNotified")
    private User userNotified;

    // Atributo para notificação vista. Default = false
    private Boolean visto;

    // Descrição da notificação
    private String texto;

    // Construtor completo
    public Notification(User userNotified, User schedule_id, String texto) {
        this.userNotified = userNotified;
        this.schedule_id = schedule_id;
        this.texto = texto;
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
