package ru.vsu.cs.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import ru.vsu.cs.api.models.Channel;
import ru.vsu.cs.api.models.Chat;
import ru.vsu.cs.api.models.Message;

import java.math.BigInteger;
import java.util.List;

@Data
@Schema(description = "Полная информация о пользователе")
public class UserResponseDto {
    private BigInteger id;
    private String name;
    private String email;
    private String password;
    private byte[] image;
    private List<Chat> chats;
    private List<Channel> channels;
    private List<Message> savedMessages;

}
