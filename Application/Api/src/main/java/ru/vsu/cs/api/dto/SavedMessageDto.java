package ru.vsu.cs.api.dto;

import lombok.Data;

import java.math.BigInteger;

@Data
public class SavedMessageDto {
    private String username;
    private BigInteger messageId;
}
