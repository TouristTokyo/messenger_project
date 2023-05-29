package ru.vsu.cs.api.dto.supporting;

import lombok.Data;

import java.math.BigInteger;

@Data
public class ChatSupportingDto {
    private BigInteger id;
    private UserSupportingDto sender;
    private UserSupportingDto recipient;
}
