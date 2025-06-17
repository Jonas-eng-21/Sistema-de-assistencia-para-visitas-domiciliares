package br.com.projeto2.aajjl.service;

import br.com.projeto2.aajjl.dto.requests.UserUpdateDTO;
import br.com.projeto2.aajjl.model.Profession;
import br.com.projeto2.aajjl.model.User;
import br.com.projeto2.aajjl.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailSenderService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createAndSave(User newUser) {

        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado");
        }

        newUser.setSenha(passwordEncoder.encode(newUser.getSenha()));
        newUser.setAtivo(true);

        User savedUser = userRepository.save(newUser);

        // emailService.enviarEmailSimples(
        //         savedUser.getEmail(),
        //         "Bem-vindo ao Sistema de assistencia para visitas domiciliares",
        //         "Olá " + savedUser.getNome() + ", seu cadastro foi realizado com sucesso!"
        // );

        return savedUser;
    }

    public Optional<User> update(Long id, UserUpdateDTO updateDTO) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    if (updateDTO.nome() != null) existingUser.setNome(updateDTO.nome());
                    if (updateDTO.email() != null) existingUser.setEmail(updateDTO.email());
                    if (updateDTO.consenhoRegional() != null) existingUser.setConsenhoRegional(updateDTO.consenhoRegional());
                    if (updateDTO.profissao() != null) existingUser.setProfissao(updateDTO.profissao());
                    if (updateDTO.ativo() != null) existingUser.setAtivo(updateDTO.ativo());

                    return userRepository.save(existingUser);
                });
    }


    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    public boolean delete(Long id) {
        return userRepository.findById(id).map(user -> {
            user.setAtivo(false);
            userRepository.save(user);
            return true;
        }).orElse(false);
    }

    public List<User> findByNome(String nome) {
        return userRepository.findByNome(nome)
                .stream()
                .filter(User::getAtivo)
                .toList();
    }

    public List<User> findByProfissao(Profession profissao) {
        return userRepository.findByProfissao(profissao)
                .stream()
                .filter(User::getAtivo)
                .toList();
    }

    public List<User> getAllAtivos() {
        return userRepository.findByAtivoTrue();
    }

    public List<User> getAllInativos() {
        return userRepository.findByAtivoFalse();
    }
}