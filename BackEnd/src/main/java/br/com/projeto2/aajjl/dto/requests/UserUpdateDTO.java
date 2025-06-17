package br.com.projeto2.aajjl.dto.requests;

import br.com.projeto2.aajjl.model.Profession;

public record UserUpdateDTO(
        String nome,
        String email,
        String consenhoRegional,
        Profession profissao,
        Boolean ativo
) {
}