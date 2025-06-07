package br.com.projeto2.aajjl.service;


import br.com.projeto2.aajjl.dto.responses.ResponseDTO;

import br.com.projeto2.aajjl.model.Profession;
import br.com.projeto2.aajjl.model.User;

import br.com.projeto2.aajjl.repository.UserRepository;
import br.com.projeto2.aajjl.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
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

    @Autowired
    private TokenService tokenService;

    public ResponseDTO create(User newUser) {

        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado");
        }

        newUser.setSenha(passwordEncoder.encode(newUser.getSenha()));

        newUser.setAtivo(true);

        User savedUser = userRepository.save(newUser);

        emailService.enviarEmailSimples(
                savedUser.getEmail(),
                "Bem-vindo ao Sistema de assistencia para visitas domiciliares",
                "Olá " + savedUser.getNome() + ", seu cadastro foi realizado com sucesso!"
        );

        String token = this.tokenService.generateToken(savedUser);
        return new ResponseDTO(
                savedUser.getNome(),
                savedUser.getCpf(),
                savedUser.getConsenhoRegional(),
                savedUser.getEmail(),
                savedUser.getProfissao(),
                savedUser.getAtivo(),
                token
        );

    }

    public List<User> getAll() {
        return userRepository.findAll()
                .stream()
                .filter(User::getAtivo)
                .toList();
    }

    public Optional<User> getById(Long id) {
        return userRepository.findById(id).filter(User::getAtivo);
    }

    public Optional<User> update(Long id, User novo) {

        User atual = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Não foi possível atualizar: usuário " + id + " não encontrado."));

        for (Field field : User.class.getDeclaredFields()) {
            field.setAccessible(true);

            if ("id".equals(field.getName())) {
                continue;
            }

            try {
                Object novoValor = field.get(novo);

                if (novoValor == null) {
                    continue;
                }
                if (novoValor instanceof String str && str.trim().isEmpty()) {
                    continue;
                }

                if (novoValor instanceof String str) {
                    novoValor = str.trim();
                }

                field.set(atual, novoValor);

            } catch (IllegalAccessException e) {
                throw new RuntimeException(
                        "Erro ao atualizar o campo " + field.getName(), e);
            }
        }

        return Optional.of(userRepository.save(atual));
    }

    public boolean delete(Long id) {
        return userRepository.findById(id).map(user -> {
            user.setAtivo(false); //Aqui eu nao deleto do BD, eu atualizo o atributo para false
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
