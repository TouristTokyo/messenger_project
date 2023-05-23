package ru.vsu.cs.api.dto.message;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Информация, необходимая для создания сообщения в канале")
public class ChannelMessageCreationDto {
    private String currentUsername;
    private String message;
    private String channelName;
}
