package ru.vsu.cs.api.dto.message;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Информация, необходимая для создания сообщения в чате")
public class ChatMessageCreationDto {
    private String currentUsername;
    private String otherUsername;
    private String message;
}
