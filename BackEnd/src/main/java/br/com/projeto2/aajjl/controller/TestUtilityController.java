package br.com.projeto2.aajjl.controller;

import org.springframework.web.bind.annotation.*;

import br.com.projeto2.aajjl.service.DatabaseCleanupService;

@RestController
@RequestMapping("/api/test-utils")
public class TestUtilityController {

    private final DatabaseCleanupService databaseCleanupService;

    public TestUtilityController(DatabaseCleanupService databaseCleanupService) {
        this.databaseCleanupService = databaseCleanupService;
    }

    @DeleteMapping("/limpar-banco")
    public String limparBanco() {
        databaseCleanupService.limparBaseDeDados();
        return "Base de dados limpa com sucesso!";
    }
}
