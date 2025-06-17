package br.com.projeto2.aajjl.service;

import br.com.projeto2.aajjl.dto.requests.ScheduleRequestDTO;
import br.com.projeto2.aajjl.dto.requests.ScheduleUpdateDTO;
import br.com.projeto2.aajjl.model.Patient;
import br.com.projeto2.aajjl.model.Schedule;
import br.com.projeto2.aajjl.model.User;
import br.com.projeto2.aajjl.repository.PatientRepository;
import br.com.projeto2.aajjl.repository.ScheduleRepository;
import br.com.projeto2.aajjl.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired private ScheduleRepository scheduleRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PatientRepository patientRepository;
    @Autowired private EmailSenderService emailService;

    public Schedule create(ScheduleRequestDTO requestDTO) {
        User user = userRepository.findById(requestDTO.userId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + requestDTO.userId()));
        Patient patient = patientRepository.findById(requestDTO.pacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com ID: " + requestDTO.pacienteId()));

        //Adicionar a lógica do envio do email posteriormente
//        newSchedule.setConcluido(false);
//        Schedule savedSchedule = scheduleRepository.save(newSchedule);
//
//        String assunto = "Novo agendamento criado";
//        String mensagem = criarResumoDoAgendamento(savedSchedule);
//
//        String emailUser = savedSchedule.getUser().getEmail();
//        emailService.enviarEmailSimples(emailUser, assunto, mensagem);
//
//        String emailPaciente = savedSchedule.getPaciente().getEmail();
//        emailService.enviarEmailSimples(emailPaciente, assunto, mensagem);
//
//        return new ScheduleResponseDTO(
//                savedSchedule.getId(),
//                savedSchedule.getConcluido(),
//                savedSchedule.getUser(),
//                savedSchedule.getPaciente(),
//                savedSchedule.getTurno(),
//                savedSchedule.getDataAgendamento(),
//                savedSchedule.getDataCriacao(),
//                savedSchedule.getObservacao(),
//                savedSchedule.getMotivoDoAtendimento(),
//                savedSchedule.getPrioridade()
//        );

        Schedule newSchedule = new Schedule();
        newSchedule.setUser(user);
        newSchedule.setPaciente(patient);
        newSchedule.setTurno(requestDTO.turno());
        newSchedule.setDataAgendamento(requestDTO.dataAgendamento());
        newSchedule.setObservacao(requestDTO.observacao());
        newSchedule.setMotivoDoAtendimento(requestDTO.motivoDoAtendimento());
        newSchedule.setPrioridade(requestDTO.prioridade());
        newSchedule.setConcluido(false);

        Schedule savedSchedule = scheduleRepository.save(newSchedule);

        return savedSchedule;
    }

    public Optional<Schedule> update(Long id, ScheduleUpdateDTO updateDTO) {
        return scheduleRepository.findById(id)
                .map(existingSchedule -> {
                    if (updateDTO.concluido() != null) existingSchedule.setConcluido(updateDTO.concluido());
                    if (updateDTO.turno() != null) existingSchedule.setTurno(updateDTO.turno());
                    if (updateDTO.dataAgendamento() != null) existingSchedule.setDataAgendamento(updateDTO.dataAgendamento());
                    if (updateDTO.observacao() != null) existingSchedule.setObservacao(updateDTO.observacao());
                    if (updateDTO.motivoDoAtendimento() != null) existingSchedule.setMotivoDoAtendimento(updateDTO.motivoDoAtendimento());
                    if (updateDTO.prioridade() != null) existingSchedule.setPrioridade(updateDTO.prioridade());
                    return scheduleRepository.save(existingSchedule);
                });
    }

    public List<Schedule> getAll() { return scheduleRepository.findAll(); }

    public Optional<Schedule> getById(Long id) { return scheduleRepository.findById(id); }

    public boolean delete(Long id) {
        return scheduleRepository.findById(id).map(schedule -> {
            schedule.setConcluido(true);
            scheduleRepository.save(schedule);
            return true;
        }).orElse(false);
    }
}