package com.login.login;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // Es mejor inyectar estas dependencias vía constructor
    @Autowired
    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private static final String SECRET_KEY = "una_clave_muy_larga_para_hmacsha256_1234567890";

    public String login(String username, String password) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return buildToken(usuario.getUsername(), usuario.getRol());
    }

    private String buildToken(String username, String rol) {
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        return Jwts.builder()
                .setSubject(username)
                .claim("rol", rol) // <-- agregamos rol al token
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 día
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    @Transactional
    public void register(RegisterRequest request) {
        // Verificación de usuario existente
        Optional<Usuario> usuarioExistente = usuarioRepository.findByUsername(request.getUsername());
        if (usuarioExistente.isPresent()) {
            throw new RuntimeException("El usuario ya existe");
        }

        // Crear nuevo usuario
        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));

        int idRol = request.getIdRol() == 0 ? 1 : request.getIdRol();
        usuario.setIdRol(idRol);
        usuario.setRol(idRol == 2 ? "ADMIN" : "USER");

        usuarioRepository.save(usuario);
    }
}
