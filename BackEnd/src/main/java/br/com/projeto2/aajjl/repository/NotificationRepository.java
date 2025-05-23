package br.com.projeto2.aajjl.repository;

import br.com.projeto2.aajjl.model.Notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByVistoFalse();
    List<Notification> findByVistoTrue();
}
