package ru.vsu.cs.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigInteger;

@Data
@Schema(description = "Информация, которая необходима для сохранения сообщения")
public class SavedMessageDto {
    private String username;
    private BigInteger messageId;
}
