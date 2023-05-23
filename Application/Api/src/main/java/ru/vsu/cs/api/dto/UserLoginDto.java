package ru.vsu.cs.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Информация, которая необходима для входа в аккаунт")
public class UserLoginDto {
    private String email;
    private String password;
}
