package com.login.login;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Servicio simple en memoria para emitir códigos de autorización efímeros.
 * Notas:
 * - Código TTL corto (por ejemplo, 2 minutos).
 * - En producción, usar almacenamiento compartido (Redis) y asociaciones más fuertes (client_id / pkce).
 */
@Service
public class AuthCodeService {
    private static class Entry {
        String username;
        Instant expiresAt;
        Entry(String username, Instant expiresAt) { this.username = username; this.expiresAt = expiresAt; }
    }

    private final Map<String, Entry> codes = new ConcurrentHashMap<>();

    public String createCode(String username) {
        String code = UUID.randomUUID().toString().replace("-", "").substring(0, 24);
        Instant expires = Instant.now().plusSeconds(120); // 2 minutos
        codes.put(code, new Entry(username, expires));
        return code;
    }

    public String consumeCode(String code) {
        Entry e = codes.remove(code);
        if (e == null) return null;
        if (Instant.now().isAfter(e.expiresAt)) return null;
        return e.username;
    }
}
