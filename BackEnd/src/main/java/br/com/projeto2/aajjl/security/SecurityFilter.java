package br.com.projeto2.aajjl.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("\n--- [SecurityFilter] Iniciando filtro para: " + request.getMethod() + " " + request.getRequestURI());

        var token = recoverToken(request);

        if (token != null) {
            System.out.println("--- [SecurityFilter] Token encontrado no header: " + token.substring(0, 15) + "...");

            var login = tokenService.validateToken(token);

            if (login != null) {
                System.out.println("--- [SecurityFilter] Token VÁLIDO. Subject (email): " + login);

                UserDetails userDetails = customUserDetailsService.loadUserByUsername(login);
                var authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println("--- [SecurityFilter] SUCESSO! Usuário autenticado e contexto de segurança definido.");
            } else {
                System.out.println("--- [SecurityFilter] ERRO: TokenService.validateToken(token) retornou NULO. O token é inválido ou expirou.");
            }
        } else {
            System.out.println("--- [SecurityFilter] Nenhum token 'Bearer' encontrado no cabeçalho Authorization.");
        }

        System.out.println("--- [SecurityFilter] Encaminhando para o próximo filtro na cadeia...\n");
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.replace("Bearer ", "");
    }
}