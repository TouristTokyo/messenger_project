package ru.vsu.cs.api.dto.supporting;

import lombok.Data;

@Data
public class SavedMessageSupportingDto {
    private UserSupportingDto sender;
    private ChatSupportingDto chat;
    private ChannelSupportingDto channel;
    private String data;
}
