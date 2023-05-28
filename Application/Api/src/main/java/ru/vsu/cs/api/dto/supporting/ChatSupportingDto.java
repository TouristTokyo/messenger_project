package ru.vsu.cs.api.dto.supporting;

import lombok.Data;

@Data
public class ChatSupportingDto {
    private UserSupportingDto sender;
    private UserSupportingDto recipient;
}
