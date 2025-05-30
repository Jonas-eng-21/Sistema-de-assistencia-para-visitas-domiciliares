package br.com.projeto2.aajjl.service;

import br.com.projeto2.aajjl.dto.responses.ResponseDTO;
import br.com.projeto2.aajjl.model.Profession;
import br.com.projeto2.aajjl.model.User;
import br.com.projeto2.aajjl.repository.UserRepository;
import br.com.projeto2.aajjl.security.TokenService;
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

    @Autowired
    private TokenService tokenService;

    public ResponseDTO create(User newUser) {

        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado");
        }

        newUser.setSenha(passwordEncoder.encode(newUser.getSenha()));

        newUser.setAtivo(true);

        User savedUser = userRepository.save(newUser);

        /*emailService.enviarEmailSimples(
                savedUser.getEmail(),
                "Bem-vindo ao Sistema de assistencia para visitas domiciliares",
                "Olá " + savedUser.getNome() + ", seu cadastro foi realizado com sucesso!"
        );*/

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

    public Optional<User> update(Long id, User newData) {
        return userRepository.findById(id).map(user -> {

            // Atualiza so oq foi enviado como nao vazio no userDetails
            if (newData.getNome() != null && !newData.getNome().trim().isEmpty()) {
                user.setNome(newData.getNome().trim());
            }

            if (newData.getCpf() != null && !newData.getCpf().trim().isEmpty()) {
                user.setCpf(newData.getCpf().trim());
            }

            if (newData.getConsenhoRegional() != null && !newData.getConsenhoRegional().trim().isEmpty()) {
                user.setConsenhoRegional(newData.getConsenhoRegional().trim());
            }

            if (newData.getEmail() != null && !newData.getEmail().trim().isEmpty()) {
                user.setEmail(newData.getEmail().trim());
            }

            if (newData.getSenha() != null && !newData.getSenha().trim().isEmpty()) {
                user.setSenha(newData.getSenha().trim());
            }

            if (newData.getProfissao() != null) {
                user.setProfissao(newData.getProfissao());
            }

            if (newData.getAtivo() != null) {
                user.setAtivo(newData.getAtivo());
            }

            return userRepository.save(user);
        });
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
