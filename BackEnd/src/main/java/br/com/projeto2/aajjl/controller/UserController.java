package br.com.projeto2.aajjl.controller;

import br.com.projeto2.aajjl.dto.requests.UserUpdateDTO;
import br.com.projeto2.aajjl.dto.responses.UserResponseDTO;
import br.com.projeto2.aajjl.model.Profession;
import br.com.projeto2.aajjl.model.User;
import br.com.projeto2.aajjl.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody User newUser) {
        User savedUser = userService.createAndSave(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponseDTO.fromEntity(savedUser));
    }

    // ListAll - GetAll (Já estava correto)
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<User> users = userService.getAll();
        List<UserResponseDTO> responseDTOs = users.stream()
                .map(UserResponseDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        return userService.getById(id)
                .map(user -> ResponseEntity.ok(UserResponseDTO.fromEntity(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO updateUserDTO) {
        return userService.update(id, updateUserDTO)
                .map(user -> ResponseEntity.ok(UserResponseDTO.fromEntity(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.delete(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/search/nome")
    public ResponseEntity<List<UserResponseDTO>> findByNome(@RequestParam String name) {
        List<User> users = userService.findByNome(name);
        List<UserResponseDTO> responseDTOs = users.stream()
                .map(UserResponseDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/search/profissao")
    public ResponseEntity<List<UserResponseDTO>> findByProfissao(@RequestParam Profession profession) {
        List<User> users = userService.findByProfissao(profession);
        List<UserResponseDTO> responseDTOs = users.stream()
                .map(UserResponseDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<UserResponseDTO>> getAllAtivos() {
        List<User> users = userService.getAllAtivos();
        List<UserResponseDTO> responseDTOs = users.stream()
                .map(UserResponseDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/inativos")
    public ResponseEntity<List<UserResponseDTO>> getAllInativos() {
        List<User> users = userService.getAllInativos();
        List<UserResponseDTO> responseDTOs = users.stream()
                .map(UserResponseDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }
}