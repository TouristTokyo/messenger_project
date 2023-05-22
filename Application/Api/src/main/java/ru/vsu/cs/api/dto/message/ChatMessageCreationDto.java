package ru.vsu.cs.api.dto.message;

import lombok.Data;

@Data
public class ChatMessageCreationDto {
    private String currentUsername;
    private String otherUsername;
    private String message;
}
