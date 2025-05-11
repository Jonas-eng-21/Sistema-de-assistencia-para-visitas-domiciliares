package br.com.projeto2.aajjl.repository;

import br.com.projeto2.aajjl.model.Profissao;
import br.com.projeto2.aajjl.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNome(String nome);
    List<User> findByProfissao(Profissao profissao);
    List<User> findByAtivoTrue();
    List<User> findByAtivoFalse();
}
