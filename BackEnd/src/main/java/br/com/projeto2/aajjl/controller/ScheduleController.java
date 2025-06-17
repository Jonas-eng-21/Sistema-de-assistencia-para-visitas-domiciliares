package br.com.projeto2.aajjl.controller;

import br.com.projeto2.aajjl.dto.requests.ScheduleRequestDTO;
import br.com.projeto2.aajjl.dto.requests.ScheduleUpdateDTO;
import br.com.projeto2.aajjl.dto.responses.ScheduleResponseDTO;
import br.com.projeto2.aajjl.model.Schedule;
import br.com.projeto2.aajjl.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/agendamentos")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<ScheduleResponseDTO> create(@RequestBody ScheduleRequestDTO requestDTO) {
        Schedule savedSchedule = scheduleService.create(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(ScheduleResponseDTO.fromEntity(savedSchedule));
    }

    @GetMapping
    public ResponseEntity<List<ScheduleResponseDTO>> getAll() {
        List<ScheduleResponseDTO> schedules = scheduleService.getAll().stream()
                .map(ScheduleResponseDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleResponseDTO> getById(@PathVariable Long id) {
        return scheduleService.getById(id)
                .map(schedule -> ResponseEntity.ok(ScheduleResponseDTO.fromEntity(schedule)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduleResponseDTO> update(@PathVariable Long id, @RequestBody ScheduleUpdateDTO updateDTO) {
        return scheduleService.update(id, updateDTO)
                .map(schedule -> ResponseEntity.ok(ScheduleResponseDTO.fromEntity(schedule)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = scheduleService.delete(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}