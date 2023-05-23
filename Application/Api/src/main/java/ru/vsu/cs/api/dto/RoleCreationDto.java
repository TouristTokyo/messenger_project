package ru.vsu.cs.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Информация, которая необходима для создания роли")
public class RoleCreationDto {
    private String name;
    private Boolean isAdmin;
    private String username;
    private String channelName;
}
