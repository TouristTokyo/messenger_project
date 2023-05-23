package ru.vsu.cs.api.dto.message;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import ru.vsu.cs.api.models.Channel;
import ru.vsu.cs.api.models.Chat;
import ru.vsu.cs.api.models.User;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Data
@Schema(description = "Информация о сообщении в канале, которое отправил пользователь ")
public class ChannelMessageDto {
    private BigInteger id;
    private Channel channel;
    private String data;
    private LocalDateTime date;
    private User author;
}
