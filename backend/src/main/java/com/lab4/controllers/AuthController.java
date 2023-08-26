package com.lab4.controllers;

import com.lab4.services.AuthException;
import com.lab4.services.AuthService;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping(value = "/api/")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<String> tryToLogin(@RequestBody UserBody userBody) {
        try {
            String token = authService.login(userBody.login, userBody.password);

            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (AuthException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping(value = "/register")
    public String tryToRegister(@RequestBody UserBody userBody) {
        try {
            return authService.register(userBody.login, userBody.password);
        } catch (AuthException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }



    @GetMapping(value = "/token-validation")
    public boolean checkToken(@RequestParam String token) {
        return authService.isJWTValid(token);
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private static class UserBody {
        private String login;
        private String password;
    }
}
