package ru.vsu.cs.api.dto;

import lombok.Data;
import ru.vsu.cs.api.models.Chat;
import ru.vsu.cs.api.models.User;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Data
public class ChatMessageDto {
    private BigInteger id;
    private Chat chat;
    private String data;
    private LocalDateTime date;
    private User author;
}
