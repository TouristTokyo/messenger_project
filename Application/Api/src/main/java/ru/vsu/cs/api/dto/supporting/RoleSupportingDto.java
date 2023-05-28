package ru.vsu.cs.api.dto.supporting;

import lombok.Data;

@Data
public class RoleSupportingDto {
    private String name;
    private boolean isAdmin;
    private boolean isCreator;
}
