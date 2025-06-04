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

    public Schedule create(Schedule newSchedule) {
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

    public Optional<Schedule> update(Long id, Schedule newData) {

        return scheduleRepository.findById(id).map(schedule -> {

            StringBuilder modificacoes = new StringBuilder("Modificações realizadas:\n");

            if (newData.getUser() != null && !newData.getUser().equals(schedule.getUser())) {
                //stringbuilder
                modificacoes.append("- User alterado: de ").append(schedule.getUser().getNome())
                        .append(" para ").append(newData.getUser().getNome()).append("\n");
                //atualização da entidade
                schedule.setUser(newData.getUser());
            }
            if (newData.getPaciente() != null && !newData.getPaciente().equals(schedule.getPaciente())) {
                modificacoes.append("- Paciente alterado: de ").append(schedule.getPaciente().getNome())
                        .append(" para ").append(newData.getPaciente().getNome()).append("\n");

                schedule.setPaciente(newData.getPaciente());
            }
            if (newData.getTurno() != null && !newData.getTurno().equals(schedule.getTurno())) {
                modificacoes.append("- Turno alterado: de ").append(schedule.getTurno())
                        .append(" para ").append(newData.getTurno()).append("\n");

                schedule.setTurno(newData.getTurno());
            }
            if (newData.getObservacao() != null && !newData.getObservacao().trim().isEmpty() && !newData.getObservacao().equals(schedule.getObservacao())) {
                modificacoes.append("- Observação alterada.\n");

                schedule.setObservacao(newData.getObservacao().trim());
            }
            if (newData.getMotivoDoAtendimento() != null && !newData.getMotivoDoAtendimento().trim().isEmpty() && !newData.getMotivoDoAtendimento().equals(schedule.getMotivoDoAtendimento())) {
                modificacoes.append("- Motivo do Atendimento alterado.\n");

                schedule.setMotivoDoAtendimento(newData.getMotivoDoAtendimento().trim());
            }
            if (newData.getPrioridade() != null && !newData.getPrioridade().equals(schedule.getPrioridade())) {
                modificacoes.append("- Prioridade alterada: de ").append(schedule.getPrioridade())
                        .append(" para ").append(newData.getPrioridade()).append("\n");

                schedule.setPrioridade(newData.getPrioridade());
            }
            if (newData.getConcluido() != null && !newData.getConcluido().equals(schedule.getConcluido())) {
                modificacoes.append("- Status alterado: de ").append(schedule.getConcluido() ? "Concluído" : "Não Concluído")
                        .append(" para ").append(newData.getConcluido() ? "Concluído" : "Não Concluído").append("\n");

                schedule.setConcluido(newData.getConcluido());
            }

            Schedule updatedSchedule = scheduleRepository.save(schedule);

            String assunto = "Atualização no agendamento";
            String mensagem = modificacoes.toString() + "\n\nResumo atual do agendamento:\n\n" +
                    criarResumoDoAgendamento(updatedSchedule);

            String emailUser = updatedSchedule.getUser().getEmail();
            emailService.enviarEmailSimples(emailUser, assunto, mensagem);

            String emailPaciente = updatedSchedule.getPaciente().getEmail();
            emailService.enviarEmailSimples(emailPaciente, assunto, mensagem);

            return updatedSchedule;
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
