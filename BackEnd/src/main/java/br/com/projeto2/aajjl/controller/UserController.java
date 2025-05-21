package br.com.projeto2.aajjl.controller;

import br.com.projeto2.aajjl.dto.ResponseDTO;
import br.com.projeto2.aajjl.model.Profession;
import br.com.projeto2.aajjl.model.User;
import br.com.projeto2.aajjl.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UserController {

    @Autowired
    private UserService userService;

    //CReate
    @PostMapping
    public ResponseEntity<ResponseDTO> createUser(@RequestBody User user) {
        ResponseDTO response = userService.create(user);
        return ResponseEntity.ok(response);
    }

    //ListAll - GetAll
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    //Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> foundUser = userService.getById(id);
        return foundUser.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    //Put
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User oldUser) {
        Optional<User> updated = userService.update(id, oldUser);
        return updated.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    //Soft Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.delete(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    //Find by nome
    @GetMapping("/search/nome")
    public ResponseEntity<List<User>> findByNome(@RequestParam String name) {
        return ResponseEntity.ok(userService.findByNome(name));
    }

    //Find by Profissao
    @GetMapping("/search/profissao")
    public ResponseEntity<List<User>> findByProfissao(@RequestParam Profession profession) {
        return ResponseEntity.ok(userService.findByProfissao(profession));
    }

    //Find by Ativo(True)
    @GetMapping("/ativos")
    public ResponseEntity<List<User>> getAllAtivos() {
        return ResponseEntity.ok(userService.getAllAtivos());
    }

    //Find by Ativo(False)
    @GetMapping("/inativos")
    public ResponseEntity<List<User>> getAllInativos() {
        return ResponseEntity.ok(userService.getAllInativos());
    }
}

