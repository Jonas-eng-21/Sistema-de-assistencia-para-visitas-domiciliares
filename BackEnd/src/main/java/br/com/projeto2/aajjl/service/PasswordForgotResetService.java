package br.com.projeto2.aajjl.service;

import br.com.projeto2.aajjl.model.PasswordResetToken;
import br.com.projeto2.aajjl.model.User;
import br.com.projeto2.aajjl.repository.PasswordResetTokenRepository;
import br.com.projeto2.aajjl.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PasswordForgotResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailSenderService emailService;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void sendPasswordResetToken(String email) {
        System.out.println("cheguei  sendPasswordResetToken(String email)" );

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        System.out.println("cheguei  User user = userRepository.findByEmail" );

        //Gera o token
        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);

        tokenRepository.save(resetToken);

        //Conferir link se é esse mesmo, e lembrar de trocar no host
        String link = "https://localhost:5173/reset-password?token=" + token;

        String assunto = "Recuperação de Senha";
        String mensagem = "Olá, " + user.getNome() + ".\n\n" +
                "Clique no link abaixo para redefinir sua senha:\n" +
                link + "\n\n" +
                "Este link expirará em 30 minutos.";

        emailService.enviarEmailSimples(user.getEmail(), assunto, mensagem);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        User user = resetToken.getUser();
        user.setSenha(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(resetToken);
    }
}
