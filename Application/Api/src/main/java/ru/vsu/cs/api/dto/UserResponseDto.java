package ru.vsu.cs.api.dto;

import lombok.Data;
import ru.vsu.cs.api.models.Channel;
import ru.vsu.cs.api.models.Chat;
import ru.vsu.cs.api.models.Message;

import java.math.BigInteger;
import java.util.List;

@Data
public class UserResponseDto {
    private BigInteger id;
    private String name;
    private String email;
    private String password;
    private Byte[] image;
    private List<Chat> chats;
    private List<Channel> channels;
    private List<Message> savedMessages;

}
