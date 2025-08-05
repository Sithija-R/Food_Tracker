package com.example.foodtracker.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String email;
    private String token;
    private String name;

    public AuthResponse(String email, String name, String token) {
        this.email = email;
        this.name = name;
        this.token = token;
    }
}
