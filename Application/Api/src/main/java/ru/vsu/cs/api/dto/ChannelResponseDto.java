package ru.vsu.cs.api.dto;

import lombok.Data;
import ru.vsu.cs.api.models.Member;
import ru.vsu.cs.api.models.Message;
import ru.vsu.cs.api.models.User;

import java.math.BigInteger;
import java.util.List;

@Data
public class ChannelResponseDto {
    private BigInteger id;
    private String name;
    private User creator;
    private List<Member> members;
    private List<Message> messages;
}
