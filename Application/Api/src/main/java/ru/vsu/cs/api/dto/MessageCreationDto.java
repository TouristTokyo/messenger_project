package ru.vsu.cs.api.dto;

import lombok.Data;

@Data
public class MessageCreationDto {
    private String author;
    private String data;
}
