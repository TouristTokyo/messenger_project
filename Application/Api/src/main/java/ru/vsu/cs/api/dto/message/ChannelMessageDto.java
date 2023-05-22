package ru.vsu.cs.api.dto.message;

import lombok.Data;
import ru.vsu.cs.api.models.Channel;
import ru.vsu.cs.api.models.Chat;
import ru.vsu.cs.api.models.User;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Data
public class ChannelMessageDto {
    private BigInteger id;
    private Channel channel;
    private String data;
    private LocalDateTime date;
    private User author;
}
