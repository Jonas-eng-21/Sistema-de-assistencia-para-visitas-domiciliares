package br.com.projeto2.aajjl.controller;

import br.com.projeto2.aajjl.dto.requests.ScheduleRequestDTO;
import br.com.projeto2.aajjl.dto.responses.ScheduleResponseDTO;
import br.com.projeto2.aajjl.model.Schedule;
import br.com.projeto2.aajjl.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agendamentos")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<ScheduleResponseDTO> create(@RequestBody ScheduleRequestDTO newSchedule) {
        ScheduleResponseDTO scheduleResponseDTO = scheduleService.create(newSchedule);
        return ResponseEntity.ok(scheduleResponseDTO);
    }

    @GetMapping
    public ResponseEntity<List<Schedule>> getAll() {
        return ResponseEntity.ok(scheduleService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getById(@PathVariable Long id) {
        Optional<Schedule> foundSchedule = scheduleService.getById(id);
        return foundSchedule.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Schedule> update(@PathVariable Long id, @RequestBody Schedule oldSchedule) {
        Optional<Schedule> updated = scheduleService.update(id, oldSchedule);
        return updated.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = scheduleService.delete(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
