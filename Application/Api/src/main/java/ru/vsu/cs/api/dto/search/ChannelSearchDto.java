package ru.vsu.cs.api.dto.search;

import lombok.Data;

import java.math.BigInteger;

@Data
public class ChannelSearchDto {
    private BigInteger id;
    private String name;

}
