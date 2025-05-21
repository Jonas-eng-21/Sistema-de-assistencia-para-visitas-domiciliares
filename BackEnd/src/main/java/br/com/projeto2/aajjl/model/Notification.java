package br.com.projeto2.aajjl.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Notification")
@NoArgsConstructor
@Getter
@Setter
public class Notification {

    //atributos do sistema
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    @Setter(AccessLevel.NONE)
    private Long id;

    //Atributos de relacionamento de tabelas no BD
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user_id; //id de user, possuidor da notificação

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private User schedule_id; //id de schedule origem da notificação

    //Atributo para notificação vista. Default = false
    private Boolean visto;

    // Descrisão da notificação
    private String texto;

    //Construtor completo pois o liso nao precisa pois o Lombook ja tem o @NoArgsConstructor
    public Notification(User user_id, User schedule_id, String texto) {

        this.user_id = user_id;
        this.schedule_id = schedule_id;
        this.texto = texto;
        this.visto = false;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "visto=" + visto +
                ", user_id=" + user_id +
                ", schedule_id='" + schedule_id + '\'' +
                ", texto='" + texto + '\'' +
                '}';
    }

    //Lombok resolve get set e no arguments builder
}
