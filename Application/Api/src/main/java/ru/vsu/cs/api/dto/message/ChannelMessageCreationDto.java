package ru.vsu.cs.api.dto.message;

import lombok.Data;

@Data
public class ChannelMessageCreationDto {
    private String currentUsername;
    private String message;
    private String channelName;
}
