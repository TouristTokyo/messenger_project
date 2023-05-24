package ru.vsu.cs.api.utils.mapper;

import ru.vsu.cs.api.dto.*;
import ru.vsu.cs.api.dto.message.ChannelMessageDto;
import ru.vsu.cs.api.dto.message.ChatMessageDto;
import ru.vsu.cs.api.dto.search.ChannelSearchDto;
import ru.vsu.cs.api.dto.search.ChatSearchDto;
import ru.vsu.cs.api.models.*;

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

    public static ChannelResponseDto convertToChannelResponseDto(Channel channel, List<Member> members,
                                                                 List<Message> messages) {
        ChannelResponseDto channelResponseDto = new ChannelResponseDto();

        channelResponseDto.setId(channel.getId());
        channelResponseDto.setCreator(channel.getCreator());
        channelResponseDto.setName(channel.getName());
        channelResponseDto.setMembers(members);
        channelResponseDto.setMessages(messages);
        return channelResponseDto;
    }

    public static ChannelMessageDto convertToChannelMessageDto(Message message) {
        ChannelMessageDto channelMessageDto = new ChannelMessageDto();

        channelMessageDto.setId(message.getId());
        channelMessageDto.setChannel(message.getChannel());
        channelMessageDto.setData(message.getData());
        channelMessageDto.setAuthor(message.getSender());
        channelMessageDto.setDate(message.getDate());

        return channelMessageDto;
    }

    public static ChannelSearchDto convertToChannelDto(Channel channel){
        ChannelSearchDto channelSearchDto = new ChannelSearchDto();

        channelSearchDto.setId(channel.getId());
        channelSearchDto.setName(channel.getName());

        return channelSearchDto;
    }

    public static ChatSearchDto convertToChatSearchDto(User user){
        ChatSearchDto chatSearchDto = new ChatSearchDto();

        chatSearchDto.setName(user.getName());
        chatSearchDto.setImage(user.getImage());

        return chatSearchDto;
    }
}
