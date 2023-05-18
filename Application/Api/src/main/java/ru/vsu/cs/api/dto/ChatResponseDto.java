package ru.vsu.cs.api.dto;

import lombok.Data;
import ru.vsu.cs.api.models.Message;

import java.math.BigInteger;
import java.util.List;

@Data
public class ChatResponseDto {
    private BigInteger id;
    private String currentUsername;
    private String otherUsername;
    private List<Message> messages;
}
