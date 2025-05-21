package br.com.projeto2.aajjl.dto;

import br.com.projeto2.aajjl.model.Profissao;

public record ResponseDTO(
        String nome,
        String cpf,
        String consenhoRegional,
        String email,
        Profissao profissao,
        Boolean ativo,
        String token
) {}

