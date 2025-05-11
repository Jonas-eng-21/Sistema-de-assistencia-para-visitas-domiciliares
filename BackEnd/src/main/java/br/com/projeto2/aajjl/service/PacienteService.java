package br.com.projeto2.aajjl.service;

import br.com.projeto2.aajjl.model.Paciente;
import br.com.projeto2.aajjl.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    public Paciente create(Paciente paciente) {
        paciente.setAtivo(true);
        return pacienteRepository.save(paciente);
    }

    public List<Paciente> getAll() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> getById(Long id) {
        return pacienteRepository.findById(id);
    }

    public Optional<Paciente> update(Long id, Paciente newData) {
        return pacienteRepository.findById(id).map(paciente -> {

            if (newData.getNome() != null && !newData.getNome().trim().isEmpty()) {
                paciente.setNome(newData.getNome().trim());
            }
            if (newData.getCpf() != null && !newData.getCpf().trim().isEmpty()) {
                paciente.setCpf(newData.getCpf().trim());
            }
            if (newData.getDoenca() != null && !newData.getDoenca().trim().isEmpty()) {
                paciente.setDoenca(newData.getDoenca().trim());
            }
            if (newData.getObservacao() != null && !newData.getObservacao().trim().isEmpty()) {
                paciente.setObservacao(newData.getObservacao().trim());
            }
            if (newData.getCep() != null && !newData.getCep().trim().isEmpty()) {
                paciente.setCep(newData.getCep().trim());
            }
            if (newData.getRua() != null && !newData.getRua().trim().isEmpty()) {
                paciente.setRua(newData.getRua().trim());
            }
            if (newData.getNumero() != null && !newData.getNumero().trim().isEmpty()) {
                paciente.setNumero(newData.getNumero().trim());
            }
            if (newData.getBairro() != null && !newData.getBairro().trim().isEmpty()) {
                paciente.setBairro(newData.getBairro().trim());
            }
            if (newData.getComplemento() != null && !newData.getComplemento().trim().isEmpty()) {
                paciente.setComplemento(newData.getComplemento().trim());
            }
            if (newData.getCidade() != null && !newData.getCidade().trim().isEmpty()) {
                paciente.setCidade(newData.getCidade().trim());
            }
            if (newData.getEstado() != null && !newData.getEstado().trim().isEmpty()) {
                paciente.setEstado(newData.getEstado().trim());
            }
            if (newData.getPrioridade() != null) {
                paciente.setPrioridade(newData.getPrioridade());
            }

            return pacienteRepository.save(paciente);
        });
    }


    public boolean delete(Long id) {
        return pacienteRepository.findById(id).map(paciente -> {
            paciente.setAtivo(false); //Aqui eu nao deleto do BD, eu atualizo o atributo para false
            pacienteRepository.save(paciente);
            return true;
        }).orElse(false);
    }

    public List<Paciente> getAllAtivos() {
        return pacienteRepository.findByAtivoTrue();
    }

    public List<Paciente> getAllInativos() {
        return pacienteRepository.findByAtivoFalse();
    }

    public List<Paciente> findByNome(String nome) {
        return pacienteRepository.findByNome(nome)
                .stream()
                .filter(Paciente::getAtivo)
                .toList();
    }

}

