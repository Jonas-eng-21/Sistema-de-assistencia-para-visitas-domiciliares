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

    //atributos do sistema
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    @Setter(AccessLevel.NONE)
    private Long id;

    //Atributo para Atendimento Ativo ou Concluido
    private Boolean concluido;

    //Atributos de relacionamentos das tabelas no BD
    //User do agendamento(quem atende)
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; //aqui temos o user que abriu ou criou o agendamento

    //Paciente do agendamento(Quem é atendido)
    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Patient paciente; //aqui temos o paciente do agendamento em questão

    //Atributos do agendamento em si
    private Shift turno;
    //Data
    @Column(name = "data_agendamento")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataAgendamento;
    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataCriacao;

    private String observacao;
    private String motivoDoAtendimento;
    private Priority prioridade;

    //Construtor
    public Schedule(Boolean concluido, User user, Patient paciente,
                    Shift turno, LocalDateTime dataAgendamento,
                    String observacao, String motivoDoAtendimento,
                    Priority prioridade) {

        this.concluido = concluido;
        this.user = user;
        this.paciente = paciente;
        this.turno = turno;
        this.dataAgendamento = dataAgendamento;
        this.observacao = observacao;
        this.motivoDoAtendimento = motivoDoAtendimento;
        this.prioridade = prioridade;
    }

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
