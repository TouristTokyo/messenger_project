package ru.vsu.cs.api.dto.supporting;

import lombok.Data;

import java.math.BigInteger;

@Data
public class UserSupportingDto {
    private BigInteger id;
    private String name;
    private byte[] image;
}
