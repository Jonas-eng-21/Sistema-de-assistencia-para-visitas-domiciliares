package br.com.projeto2.aajjl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EnvioDeEmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarEmailSimples(String para, String assunto, String corpo) {

        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setTo(para);
        mensagem.setSubject(assunto);
        mensagem.setText(corpo);
        mensagem.setFrom("projeto2aajjl@gmail.com"); //Tem que ser o mesmo do aplication.properties

        mailSender.send(mensagem);
    }
}
