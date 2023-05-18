package ru.vsu.cs.api.dto;

import lombok.Data;

@Data
public class ChatCreationDto {
    private String currentUsername;
    private String otherUsername;
    private String message;
}
