package ru.vsu.cs.api.dto;

import lombok.Data;

@Data
public class UserCreationDto {
    private String name;
    private String email;
    private String password;
}
