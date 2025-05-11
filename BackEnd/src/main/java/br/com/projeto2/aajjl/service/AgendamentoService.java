package br.com.projeto2.aajjl.service;

import br.com.projeto2.aajjl.model.Agendamento;
import br.com.projeto2.aajjl.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public Agendamento create(Agendamento agendamento) {
        agendamento.setConcluido(false); // Agendamentos começam como não concluídos
        return agendamentoRepository.save(agendamento);
    }

    public List<Agendamento> getAll() {
        return agendamentoRepository.findAll();
    }

    public Optional<Agendamento> getById(Long id) {
        return agendamentoRepository.findById(id);
    }

    public Optional<Agendamento> update(Long id, Agendamento newData) {
        return agendamentoRepository.findById(id).map(agendamento -> {
            if (newData.getUser() != null) {
                agendamento.setUser(newData.getUser());
            }
            if (newData.getPacinete() != null) {
                agendamento.setPacinete(newData.getPacinete());
            }
            if (newData.getTurno() != null) {
                agendamento.setTurno(newData.getTurno());
            }
            if (newData.getDia() != null) {
                agendamento.setDia(newData.getDia());
            }
            if (newData.getMes() != null && !newData.getMes().trim().isEmpty()) {
                agendamento.setMes(newData.getMes().trim());
            }
            if (newData.getAno() != null) {
                agendamento.setAno(newData.getAno());
            }
            if (newData.getObservacao() != null && !newData.getObservacao().trim().isEmpty()) {
                agendamento.setObservacao(newData.getObservacao().trim());
            }
            if (newData.getMotivoDoAtendimento() != null && !newData.getMotivoDoAtendimento().trim().isEmpty()) {
                agendamento.setMotivoDoAtendimento(newData.getMotivoDoAtendimento().trim());
            }
            if (newData.getPrioridade() != null) {
                agendamento.setPrioridade(newData.getPrioridade());
            }
            if (newData.getConcluido() != null) {
                agendamento.setConcluido(newData.getConcluido());
            }

            return agendamentoRepository.save(agendamento);
        });
    }

    public boolean delete(Long id) {
        return agendamentoRepository.findById(id).map(agendamento -> {
            agendamento.setConcluido(true);
            //nao deletamos os agendamentos somente os colocamos
            // como concluidos para podermos ter historico
            agendamentoRepository.save(agendamento);
            return true;
        }).orElse(false);
    }
}
