package ru.vsu.cs.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import ru.vsu.cs.api.models.Member;
import ru.vsu.cs.api.models.Message;
import ru.vsu.cs.api.models.User;

import java.math.BigInteger;
import java.util.List;

@Data
@Schema(description = "Полная информация о канале")
public class ChannelResponseDto {
    private BigInteger id;
    private String name;
    private User creator;
    private List<Member> members;
    private List<Message> messages;
}
