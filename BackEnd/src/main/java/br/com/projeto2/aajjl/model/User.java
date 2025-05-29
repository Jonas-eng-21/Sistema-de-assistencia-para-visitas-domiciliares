package br.com.projeto2.aajjl.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "Users")
@NoArgsConstructor
@Getter
@Setter
public class User {

    // Atributos do sistema
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    @Setter(AccessLevel.NONE)
    private Long id;

    // Atributos de relacionamento de tabelas no BD
    @OneToMany(mappedBy = "user")
    private List<Schedule> agendamentos; // Lista de agendamentos criados pelo User

    @OneToMany(mappedBy = "userNotified")
    private List<Notification> notifications; // Lista de notificações do usuário

    @OneToMany
    @JoinColumn(name = "cadastrado_por_id")
    private List<Patient> pacientes; // Lista de pacientes cadastrados pelo User

    // Atributo para User Ativo ou Inativo
    private Boolean ativo;

    // Profissões
    @Enumerated(EnumType.STRING)
    private Profession profissao;

    // Atributos da pessoa
    private String nome;

    @Column(unique = true)
    private String cpf;

    private String consenhoRegional;

    private String email;

    private String senha;

    // Construtor completo
    public User(Profession profissao, String nome, String cpf,
                String email, String senha,
                String consenhoRegional) {

        this.profissao = profissao;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.consenhoRegional = consenhoRegional;
    }

    @Override
    public String toString() {
        return "User{" +
                "ativo=" + ativo +
                ", profissao=" + profissao +
                ", nome='" + nome + '\'' +
                ", documento_profisional='" + consenhoRegional + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
