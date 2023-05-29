package ru.vsu.cs.api.dto.supporting;

import lombok.Data;

import java.math.BigInteger;

@Data
public class SavedMessageSupportingDto {
    private BigInteger id;
    private UserSupportingDto sender;
    private ChatSupportingDto chat;
    private ChannelSupportingDto channel;
    private String data;
}
