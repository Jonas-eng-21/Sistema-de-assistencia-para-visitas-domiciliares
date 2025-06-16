package br.com.projeto2.aajjl.controller;

import br.com.projeto2.aajjl.service.PasswordForgotResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/password")
@RequiredArgsConstructor
public class PasswordForgotResetControler {

    @Autowired
    private PasswordForgotResetService passwordForgotResetService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        //System.out.println(" @PostMapping(\"/forgot-password\")");
        passwordForgotResetService.sendPasswordResetToken(email);
        return ResponseEntity.ok("E-mail de recuperação enviado");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token,
                                                @RequestParam String newPassword) {
        passwordForgotResetService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Senha alterada com sucesso");
    }

}
