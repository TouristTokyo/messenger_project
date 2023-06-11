package ru.vsu.cs.api.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.api.models.Chat;
import ru.vsu.cs.api.models.User;
import ru.vsu.cs.api.repositories.ChatRepository;
import ru.vsu.cs.api.utils.exceptions.ChatException;

import java.math.BigInteger;
import java.util.List;

@Service
@Slf4j
public class ChatService {
    private final ChatRepository chatRepository;

    @Autowired
    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    @Transactional
    public Chat create(Chat chat) {
        Chat foundChat = chatRepository.findByUsernames(chat.getUserFirst().getId(), chat.getUserSecond().getId())
                .orElse(null);
        if (foundChat != null) {
            return foundChat;
        }
        log.info("Chat (" + chat.getUserFirst().getName() + "<-->" + chat.getUserSecond().getName() + ") create successfully");
        return chatRepository.saveAndFlush(chat);
    }

    @Transactional(readOnly = true)
    public Chat getByUsernames(User currentUser, User otherUser) {
        Chat chat = chatRepository.findByUsernames(currentUser.getId(), otherUser.getId()).orElse(null);
        if (chat == null) {
            log.info("Not found chat for users: " + currentUser.getName() + " and " + otherUser.getName());
            throw new ChatException("Не найден чат между такими пользователями: " + currentUser.getName() + " и " + otherUser.getName());
        }
        return chat;
    }

    @Transactional(readOnly = true)
    public Chat getById(BigInteger id) {
        Chat chat = chatRepository.findById(id).orElse(null);
        if (chat == null) {
            log.info("Not found chat with id: " + id);
            throw new ChatException("Не существует чата с таким id: " + id);
        }
        return chat;
    }

    @Transactional(readOnly = true)
    public List<Chat> getChatsByUser(User user) {
        return chatRepository.findByUserFirstOrUserSecond(user, user);
    }

    @Transactional
    public void delete(BigInteger id) {
        log.info("Deleted chat with id: " + id);
        chatRepository.deleteById(id);
    }

}
