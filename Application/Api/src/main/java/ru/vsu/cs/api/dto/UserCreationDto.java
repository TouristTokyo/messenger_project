package ru.vsu.cs.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Информация, которая необходима для регистрации пользователя")
public class UserCreationDto {
    private String name;
    private String email;
    private String password;
}
