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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    @Setter(AccessLevel.NONE)
    private Long id;

    @OneToMany(mappedBy = "paciente")
    private List<Schedule> agendamentos;

//    @ManyToOne
//    @JoinColumn(name = "cadastrado_por_id")
//    private User cadastradoPor;

    private Boolean ativo;
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
    private String cidade;
    private String estado;

    //Prioridade como Enum
    @Enumerated(EnumType.STRING)
    private Priority prioridade;

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
