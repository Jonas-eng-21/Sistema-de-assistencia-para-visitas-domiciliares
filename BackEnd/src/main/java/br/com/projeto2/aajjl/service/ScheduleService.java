package br.com.projeto2.aajjl.service;

import br.com.projeto2.aajjl.dto.requests.ScheduleRequestDTO;
import br.com.projeto2.aajjl.dto.responses.ScheduleResponseDTO;
import br.com.projeto2.aajjl.model.Schedule;
import br.com.projeto2.aajjl.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private EmailSenderService emailService;

    private String criarResumoDoAgendamento(Schedule schedule) {
        return String.format(
                "Olá!\n\nUm novo agendamento foi criado com os seguintes detalhes:\n\n" +
                        "- Criado por: %s\n" +
                        "- Paciente: %s\n" +
                        "- Médico (User): %s\n" +
                        "- Data: %s\n" +
                        "- Turno: %s\n" +
                        "- Motivo: %s\n" +
                        "- Prioridade: %s\n\n" +
                        "Por favor, fique atento às orientações.",
                schedule.getUser().getNome(),
                schedule.getPaciente().getNome(),
                schedule.getUser().getNome(),
                schedule.getDataAgendamento(),
                schedule.getTurno(),
                schedule.getMotivoDoAtendimento(),
                schedule.getPrioridade()
        );
    }

    public ScheduleResponseDTO create(ScheduleRequestDTO newSchedule) {
        newSchedule.setConcluido(false); // Agendamentos começam como não concluídos
        Schedule savedSchedule = scheduleRepository.save(newSchedule);

        String assunto = "Novo agendamento criado";
        String mensagem = criarResumoDoAgendamento(savedSchedule);

        String emailUser = savedSchedule.getUser().getEmail();
        emailService.enviarEmailSimples(emailUser, assunto, mensagem);

        String emailPaciente = savedSchedule.getPaciente().getEmail();
        emailService.enviarEmailSimples(emailPaciente, assunto, mensagem);

        return savedSchedule;
    }

    public List<Schedule> getAll() {
        return scheduleRepository.findAll();
    }

    public Optional<Schedule> getById(Long id) {
        return scheduleRepository.findById(id);
    }

    public Optional<Schedule> update(Long id, Schedule novo) {

        Schedule atual = scheduleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Não foi possível atualizar: agendamento " + id + " não encontrado."));

        for (Field field : Schedule.class.getDeclaredFields()) {
            field.setAccessible(true);

            if ("id".equals(field.getName())) {
                continue;
            }

            try {
                Object novoValor = field.get(novo);

                if (novoValor == null) {
                    continue;
                }
                if (novoValor instanceof String str && str.trim().isEmpty()) {
                    continue;
                }

                if (novoValor instanceof String str) {
                    novoValor = str.trim();
                }

                field.set(atual, novoValor);

            } catch (IllegalAccessException e) {
                throw new RuntimeException(
                        "Erro ao atualizar o campo " + field.getName(), e);
            }
        }

        return Optional.of(scheduleRepository.save(atual));
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
