package ru.vsu.cs.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.api.models.Chat;
import ru.vsu.cs.api.models.Message;
import ru.vsu.cs.api.repositories.MessageRepository;

import java.math.BigInteger;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class MessageService {
    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional
    public Message save(Message message) {
        return messageRepository.saveAndFlush(message);
    }

    public List<Message> getMessagesByChat(Chat chat){
        return messageRepository.findByChat(chat);
    }

    public Message getMessage(BigInteger id) {
        return messageRepository.findById(id).orElse(null); //Возможно придётся сделать Exception
    }
}
