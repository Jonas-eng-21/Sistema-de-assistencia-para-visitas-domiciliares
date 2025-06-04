package br.com.projeto2.aajjl.service;

import br.com.projeto2.aajjl.dto.requests.NotificationRequestDTO;
import br.com.projeto2.aajjl.dto.responses.NotificationResponseDTO;
import br.com.projeto2.aajjl.model.Notification;
import br.com.projeto2.aajjl.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public NotificationResponseDTO create(Notification newNotification) {
        newNotification.setVisto(false);
        Notification save = notificationRepository.save(newNotification);
        return new NotificationResponseDTO(
                save.getId(),
                save.getUserNotified(),
                save.getSchedule_id(),
                save.getTexto(),
                save.getVisto()
        );

    }


    public List<Notification> getAll() {
        return notificationRepository.findAll()
                .stream()
                .filter(Notification::getVisto)
                .toList();
    }

    public Optional<Notification> getById(Long id) {
        return notificationRepository.findById(id).filter(Notification::getVisto);
    }

    public Optional<Notification> update(Long id, Notification newData) {
        return notificationRepository.findById(id).map(notification -> {

            // Atualiza so oq foi enviado como nao vazio no userDetails
            if (newData.getTexto() != null && !newData.getTexto().trim().isEmpty()) {
                notification.setTexto(newData.getTexto().trim());
            }

            if (newData.getVisto() != null) {
                notification.setVisto(newData.getVisto());
            }

            return notificationRepository.save(notification);
        });
    }

    public boolean delete(Long id) {
        return notificationRepository.findById(id).map(notification -> {
            notification.setVisto(true); //Aqui eu nao deleto do BD, eu atualizo o atributo para false
            notificationRepository.save(notification);
            return true;
        }).orElse(false);
    }

    public List<Notification> getAllVistoFalse() {
        return notificationRepository.findByVistoFalse();
    }

    public List<Notification> getAllVistoTrue() {
        return notificationRepository.findByVistoTrue();
    }
}
