package br.com.projeto2.aajjl.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Paciente")
@NoArgsConstructor
@Getter
@Setter
public class Paciente {

    //atributos do sistema
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    @Setter(AccessLevel.NONE)
    private Long id;

    //Atributos de relacionamento das tabelas no BD
    @OneToMany(mappedBy = "pacinete")
    private List<Agendamento> agendamentos; //aqui temos a lista de agendamentos relacionados ao cliente

    @ManyToOne
    @JoinColumn(name = "cadastrado_por_id")
    private User cadastradoPor; //Aqui temos o registro do User que cadastrou o Paciente no sistema

    //Atributo para User Ativo ou Inativo
    private Boolean ativo;
    //Tem que ter pra poder fazer funcionar o softDelete

    //atributos da pessoa
    private String nome;
    private String cpf;
    private String doenca;
    private String observacao;

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
    private Prioridade prioridade;

    //construtor
    public Paciente(String nome, String cpf, String doenca,
                    String cep, String rua, String numero,
                    String bairro, String complemento,
                    String cidade, String estado,
                    Prioridade prioridade) {
        this.nome = nome;
        this.cpf = cpf;
        this.doenca = doenca;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.complemento = complemento;
        this.cidade = cidade;
        this.estado = estado;
        this.prioridade = prioridade;
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
