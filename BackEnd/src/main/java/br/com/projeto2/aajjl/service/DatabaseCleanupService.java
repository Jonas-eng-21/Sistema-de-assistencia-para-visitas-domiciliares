package br.com.projeto2.aajjl.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.projeto2.aajjl.repository.*;

@Service
public class DatabaseCleanupService {

    private final NotificationRepository notificationRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PatientRepository patientRepository;
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    public DatabaseCleanupService(NotificationRepository notificationRepository,
                                    PasswordResetTokenRepository passwordResetTokenRepository, 
                                    PatientRepository patientRepository, 
                                    ScheduleRepository scheduleRepository, 
                                    UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.patientRepository = patientRepository;
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void limparBaseDeDados() {
        // A ordem importa por conta das constraints (chaves estrangeiras)
        notificationRepository.deleteAll();
        scheduleRepository.deleteAll();
        passwordResetTokenRepository.deleteAll();
        patientRepository.deleteAll();
        userRepository.deleteAll();
    }
}