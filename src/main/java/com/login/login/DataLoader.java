package com.login.login;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UsuarioRepository repo;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UsuarioRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Inserta un usuario de prueba si no existe
        if (repo.findByUsername("jose").isEmpty()) {
            Usuario u = new Usuario();
            u.setUsername("jose");
            u.setNombre("Jose Prueba");
            u.setEmail("jose@example.com");
            // encode password so AuthService.login (which expects BCrypt) will work
            u.setPassword(passwordEncoder.encode("password123"));
            u.setIdRol(1);
            u.setRol("USER");
            repo.save(u);
            System.out.println("Usuario de prueba 'jose' creado por DataLoader");
        }
    }
}
