package br.com.projeto2.aajjl.repository;

import br.com.projeto2.aajjl.model.Profession;
import br.com.projeto2.aajjl.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNome(String nome);
    List<User> findByProfissao(Profession profissao);
    Optional<User> findByEmail(String email);
    List<User> findByAtivoTrue();
    List<User> findByAtivoFalse();
}
