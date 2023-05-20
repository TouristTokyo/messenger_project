package ru.vsu.cs.api.dto;

import lombok.Data;

@Data
public class RoleCreationDto {
    private String name;
    private Boolean isAdmin;
    private String username;
    private String channelName;
}
