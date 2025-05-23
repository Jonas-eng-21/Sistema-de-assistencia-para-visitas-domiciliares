package br.com.projeto2.aajjl.controller;

import br.com.projeto2.aajjl.model.Notification;
import br.com.projeto2.aajjl.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/n")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public ResponseEntity<Notification> create(@RequestBody Notification newNotification) {
        return ResponseEntity.ok(notificationService.create(newNotification));
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getAll() {
        return ResponseEntity.ok(notificationService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getById(@PathVariable Long id) {
        Optional<Notification> foundNotification = notificationService.getById(id);
        return foundNotification.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/vfalse")
    public ResponseEntity<List<Notification>> getAllVistoFalse() {
        return ResponseEntity.ok(notificationService.getAllVistoFalse());
    }

    @GetMapping("/vtrue")
    public ResponseEntity<List<Notification>> getAllVistoTrue() {
        return ResponseEntity.ok(notificationService.getAllVistoTrue());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notification> update(@PathVariable Long id, @RequestBody Notification oldNotification) {
        Optional<Notification> updated = notificationService.update(id, oldNotification);
        return updated.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = notificationService.delete(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
