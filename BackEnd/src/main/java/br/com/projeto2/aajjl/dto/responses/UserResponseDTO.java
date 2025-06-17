package br.com.projeto2.aajjl.dto.responses;

import br.com.projeto2.aajjl.model.Profession;
import br.com.projeto2.aajjl.model.User;

public record UserResponseDTO(
        Long id,
        String nome,
        String email,
        String cpf,
        Profession profissao,
        String consenhoRegional,
        Boolean ativo
) {
    public static UserResponseDTO fromEntity(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getNome(),
                user.getEmail(),
                user.getCpf(),
                user.getProfissao(),
                user.getConsenhoRegional(),
                user.getAtivo()
        );
    }
}
