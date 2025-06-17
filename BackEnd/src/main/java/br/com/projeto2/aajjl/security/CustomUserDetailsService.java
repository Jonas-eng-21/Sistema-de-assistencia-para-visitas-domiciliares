package br.com.projeto2.aajjl.security;

import br.com.projeto2.aajjl.model.User;
import br.com.projeto2.aajjl.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. Busca o usuário profissional (Médico, Enfermeiro, etc.) no banco de dados.
        User user = this.repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário com e-mail '" + username + "' não encontrado."));

        // 2. Atribui a permissão única "ROLE_USER" para QUALQUER profissional encontrado.
        //    Esta role funcionará como seu "admin".
        var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        // 3. Retorna o UserDetails do Spring com email, senha e a permissão definida.
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getSenha(), authorities);
    }
}