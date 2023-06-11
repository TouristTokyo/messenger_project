package ru.vsu.cs.api.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.api.models.Channel;
import ru.vsu.cs.api.models.Chat;
import ru.vsu.cs.api.models.Message;
import ru.vsu.cs.api.repositories.MessageRepository;
import ru.vsu.cs.api.utils.exceptions.MessageException;

import java.math.BigInteger;
import java.util.List;

@Service
@Slf4j
public class MessageService {
    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional
    public Message save(Message message) {
        log.info(message.getSender().getName() + " sent message");
        return messageRepository.saveAndFlush(message);
    }

    @Transactional(readOnly = true)
    public List<Message> getMessagesByChat(Chat chat) {
        return messageRepository.findByChat(chat);
    }

    @Transactional(readOnly = true)
    public List<Message> getMessagesByChannel(Channel channel) {
        return messageRepository.findByChannel(channel);
    }

    @Transactional(readOnly = true)
    public Message getMessage(BigInteger id) {
        Message message = messageRepository.findById(id).orElse(null);
        if (message == null) {
            log.info("Not found message with id: " + id);
            throw new MessageException("Не найденно сообщения с данным id: " + id);
        }
        return message;
    }
}
