package br.com.projeto2.aajjl.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Agendamento")
@NoArgsConstructor
@Getter
@Setter
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    @Setter(AccessLevel.NONE)
    private Long id;

    private Boolean concluido;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Patient paciente;

    private Shift turno;
    @Column(name = "data_agendamento")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyy-MM-dd")
    private LocalDate dataAgendamento;
    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataCriacao;

    private String observacao;
    private String motivoDoAtendimento;
    private Priority prioridade;

    @Override
    public String toString() {
        return "Agendamento{" +
                "concluido=" + concluido +
                ", user=" + user +
                ", paciente=" + paciente +
                ", turno=" + turno +
                ", data=" + dataAgendamento +
                ", observacao='" + observacao + '\'' +
                ", motivoDoAtendimento='" + motivoDoAtendimento + '\'' +
                ", prioridade=" + prioridade +
                '}';
    }
}
