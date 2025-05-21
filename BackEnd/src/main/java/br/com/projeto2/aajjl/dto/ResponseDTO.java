package br.com.projeto2.aajjl.dto;

import br.com.projeto2.aajjl.model.Profession;

public record ResponseDTO(
        String nome,
        String cpf,
        String consenhoRegional,
        String email,
        Profession profissao,
        Boolean ativo,
        String token
) {}

