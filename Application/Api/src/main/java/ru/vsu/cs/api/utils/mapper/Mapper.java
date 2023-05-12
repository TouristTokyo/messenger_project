package ru.vsu.cs.api.utils.mapper;

import ru.vsu.cs.api.dto.UserCreationDto;
import ru.vsu.cs.api.dto.UserResponseDto;
import ru.vsu.cs.api.models.User;

public class Mapper {
    public static UserResponseDto convertToUserResponseDto(User user) {
        UserResponseDto userResponseDto = new UserResponseDto();

        userResponseDto.setId(user.getId());
        userResponseDto.setName(user.getName());
        userResponseDto.setEmail(user.getEmail());
        userResponseDto.setPassword(user.getPassword());
        userResponseDto.setImage(user.getImage());
        userResponseDto.setChats(user.getChats());
        userResponseDto.setSavedMessages(user.getSavedMessage());
        userResponseDto.setChannels(user.getChannels());

        return userResponseDto;
    }

    public static User convertToUser(UserCreationDto userCreationDto) {
        User user = new User();

        user.setName(userCreationDto.getName());
        user.setEmail(userCreationDto.getEmail());
        user.setPassword(userCreationDto.getPassword());

        return user;
    }
}
