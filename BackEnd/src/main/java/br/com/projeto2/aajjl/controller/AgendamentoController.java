package br.com.projeto2.aajjl.controller;

import br.com.projeto2.aajjl.model.Agendamento;
import br.com.projeto2.aajjl.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<Agendamento> create(@RequestBody Agendamento agendamento) {
        return ResponseEntity.ok(agendamentoService.create(agendamento));
    }

    @GetMapping
    public ResponseEntity<List<Agendamento>> getAll() {
        return ResponseEntity.ok(agendamentoService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> getById(@PathVariable Long id) {
        Optional<Agendamento> agendamento = agendamentoService.getById(id);
        return agendamento.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agendamento> update(@PathVariable Long id, @RequestBody Agendamento agendamento) {
        Optional<Agendamento> updated = agendamentoService.update(id, agendamento);
        return updated.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = agendamentoService.delete(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
