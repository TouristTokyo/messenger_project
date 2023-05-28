package ru.vsu.cs.api.dto.supporting;

import lombok.Data;

@Data
public class MemberSupportingDto {
    private UserSupportingDto user;
    private RoleSupportingDto role;
}
