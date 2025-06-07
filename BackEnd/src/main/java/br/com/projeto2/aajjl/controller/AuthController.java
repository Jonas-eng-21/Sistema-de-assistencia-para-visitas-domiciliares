/*
Retirar segurança para testes:


package br.com.projeto2.aajjl.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AuthController {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
 */




package br.com.projeto2.aajjl.controller;

import br.com.projeto2.aajjl.dto.requests.LoginRequestDTO;
import br.com.projeto2.aajjl.dto.responses.ResponseDTO;
import br.com.projeto2.aajjl.model.User;
import br.com.projeto2.aajjl.repository.UserRepository;
import br.com.projeto2.aajjl.security.TokenService;
import br.com.projeto2.aajjl.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private final UserRepository repository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final TokenService tokenService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body){
        User user = this.repository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("User not found"));
        if(passwordEncoder.matches(body.senha(), user.getSenha())) {
            String token = this.tokenService.generateToken(user);
            ResponseDTO response = new ResponseDTO(
                    user.getNome(),
                    user.getCpf(),
                    user.getConsenhoRegional(),
                    user.getEmail(),
                    user.getProfissao(),
                    user.getAtivo(),
                    token
            );
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().build();
    }

}
