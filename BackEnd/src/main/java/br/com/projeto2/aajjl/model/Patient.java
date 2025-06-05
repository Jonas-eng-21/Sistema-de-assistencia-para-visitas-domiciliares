package br.com.projeto2.aajjl.model;

import br.com.projeto2.aajjl.dto.requests.PatientRequestDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Paciente")
@NoArgsConstructor
@Getter
@Setter
public class Patient {

    //atributos do sistema
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    @Setter(AccessLevel.NONE)
    private Long id;

    //Atributos de relacionamento das tabelas no BD
    @OneToMany(mappedBy = "paciente")
    private List<Schedule> agendamentos; //aqui temos a lista de agendamentos relacionados ao cliente

    @ManyToOne
    @JoinColumn(name = "cadastrado_por_id")
    private User cadastradoPor; //Aqui temos o registro do User que cadastrou o Paciente no sistema

    //Atributo para User Ativo ou Inativo
    private Boolean ativo;
    //Tem que ter pra poder fazer funcionar o softDelete

    //atributos da pessoa
    private String nome;
    private String cpf;
    private String email;
    private String doenca;
    private String observacao;
    @Column(name = "data_nascimento")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dataNascimento;

    //atributos endereço
    private String cep;
    private String rua;
    private String numero;
    private String bairro;
    private String complemento;
    private String cidade; //Tem que ver se precisa de cidade mesmo pois o postinho é por cidade ne amigos
    private String estado; //Tem que ver se precisa de cidade mesmo pois o postinho é por cidade ne amigos

    //Prioridade como Enum
    @Enumerated(EnumType.STRING)
    private Priority prioridade;

    //construtor
    public Patient(PatientRequestDTO patientRequestDTO) {

        this.cadastradoPor = patientRequestDTO.cadastradoPorId();
        this.nome = patientRequestDTO.nome();
        this.cpf = patientRequestDTO.cpf();
        this.email = patientRequestDTO.email();
        this.doenca = patientRequestDTO.doenca();
        this.cep = patientRequestDTO.cep();
        this.rua = patientRequestDTO.rua();
        this.numero = patientRequestDTO.numero();
        this.bairro = patientRequestDTO.bairro();
        this.complemento = patientRequestDTO.complemento();
        this.cidade = patientRequestDTO.cidade();
        this.estado = patientRequestDTO.estado();
        this.prioridade = patientRequestDTO.prioridade();
        this.dataNascimento = patientRequestDTO.dataNascimento();

    }

    @Override
    public String toString() {
        return "Paciente{" +
                "nome='" + nome + '\'' +
                ", cpf='" + cpf + '\'' +
                ", doenca='" + doenca + '\'' +
                ", observacao='" + observacao + '\'' +
                ", CEP='" + cep + '\'' +
                ", rua='" + rua + '\'' +
                ", numero='" + numero + '\'' +
                ", bairro='" + bairro + '\'' +
                ", complemento='" + complemento + '\'' +
                ", prioridade=" + prioridade +
                '}';
    }
}
