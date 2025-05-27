package br.com.projeto2.aajjl.service;

import br.com.projeto2.aajjl.model.Schedule;
import br.com.projeto2.aajjl.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public Schedule create(Schedule newSchedule) {
        newSchedule.setConcluido(false); // Agendamentos começam como não concluídos
        return scheduleRepository.save(newSchedule);
    }

    public List<Schedule> getAll() {
        return scheduleRepository.findAll();
    }

    public Optional<Schedule> getById(Long id) {
        return scheduleRepository.findById(id);
    }

    public Optional<Schedule> update(Long id, Schedule newData) {
        return scheduleRepository.findById(id).map(schedule -> {
            if (newData.getUser() != null) {
                schedule.setUser(newData.getUser());
            }
            if (newData.getPacinete() != null) {
                schedule.setPacinete(newData.getPacinete());
            }
            if (newData.getTurno() != null) {
                schedule.setTurno(newData.getTurno());
            }
            if (newData.getDia() != null) {
                schedule.setDia(newData.getDia());
            }
            if (newData.getMes() != null && !newData.getMes().trim().isEmpty()) {
                schedule.setMes(newData.getMes().trim());
            }
            if (newData.getAno() != null) {
                schedule.setAno(newData.getAno());
            }
            if (newData.getObservacao() != null && !newData.getObservacao().trim().isEmpty()) {
                schedule.setObservacao(newData.getObservacao().trim());
            }
            if (newData.getMotivoDoAtendimento() != null && !newData.getMotivoDoAtendimento().trim().isEmpty()) {
                schedule.setMotivoDoAtendimento(newData.getMotivoDoAtendimento().trim());
            }
            if (newData.getPrioridade() != null) {
                schedule.setPrioridade(newData.getPrioridade());
            }
            if (newData.getConcluido() != null) {
                schedule.setConcluido(newData.getConcluido());
            }

            return scheduleRepository.save(schedule);
        });
    }

    public boolean delete(Long id) {
        return scheduleRepository.findById(id).map(schedule -> {
            schedule.setConcluido(true);
            //nao deletamos os agendamentos somente os colocamos
            // como concluidos para podermos ter historico
            scheduleRepository.save(schedule);
            return true;
        }).orElse(false);
    }
}
