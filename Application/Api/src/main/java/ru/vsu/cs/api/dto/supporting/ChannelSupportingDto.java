package ru.vsu.cs.api.dto.supporting;

import lombok.Data;

import java.math.BigInteger;

@Data
public class ChannelSupportingDto {
    private BigInteger id;
    private String name;
}
