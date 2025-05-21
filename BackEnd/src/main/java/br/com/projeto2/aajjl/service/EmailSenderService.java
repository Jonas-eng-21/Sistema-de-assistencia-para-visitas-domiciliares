package br.com.projeto2.aajjl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleMail (String to, String emailSubject, String bodyText) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(emailSubject);
        message.setText(bodyText);
        message.setFrom("projeto2aajjl@gmail.com"); //Tem que ser o mesmo do aplication.properties

        mailSender.send(message);
    }
}
