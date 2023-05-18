package ru.vsu.cs.api.utils.mapper;

import ru.vsu.cs.api.dto.ChatMessageDto;
import ru.vsu.cs.api.dto.UserCreationDto;
import ru.vsu.cs.api.dto.UserResponseDto;
import ru.vsu.cs.api.models.Channel;
import ru.vsu.cs.api.models.Chat;
import ru.vsu.cs.api.models.Message;
import ru.vsu.cs.api.models.User;

import java.util.List;

public class Mapper {
    public static UserResponseDto convertToUserResponseDto(User user, List<Chat> chats, List<Message> savedMessages,
                                                           List<Channel> channels) {
        UserResponseDto userResponseDto = new UserResponseDto();

        userResponseDto.setId(user.getId());
        userResponseDto.setName(user.getName());
        userResponseDto.setEmail(user.getEmail());
        userResponseDto.setPassword(user.getPassword());
        userResponseDto.setImage(user.getImage());
        userResponseDto.setChats(chats);
        userResponseDto.setSavedMessages(savedMessages);
        userResponseDto.setChannels(channels);

        return userResponseDto;
    }

    public static User convertToUser(UserCreationDto userCreationDto) {
        User user = new User();

        user.setName(userCreationDto.getName());
        user.setEmail(userCreationDto.getEmail());
        user.setPassword(userCreationDto.getPassword());

        return user;
    }

    public static Chat convertToChat(User firstUser, User secondUser) {
        Chat chat = new Chat();

        chat.setUserFirst(firstUser);
        chat.setUserSecond(secondUser);

        return chat;
    }

    public static ChatMessageDto convertToChatMessageDto(Message message) {
        ChatMessageDto chatMessageDto = new ChatMessageDto();

        chatMessageDto.setId(message.getId());
        chatMessageDto.setChat(message.getChat());
        chatMessageDto.setData(message.getData());
        chatMessageDto.setAuthor(message.getSender());
        chatMessageDto.setDate(message.getDate());

        return chatMessageDto;
    }
}
