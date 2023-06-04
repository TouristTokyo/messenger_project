package ru.vsu.cs.api.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.api.models.Message;
import ru.vsu.cs.api.models.SavedMessage;
import ru.vsu.cs.api.models.User;
import ru.vsu.cs.api.repositories.SavedMessageRepository;
import ru.vsu.cs.api.utils.exceptions.MessageException;

import java.math.BigInteger;
import java.util.List;

@Service
@Slf4j
public class SavedMessageService {
    private final SavedMessageRepository savedMessageRepository;

    @Autowired
    public SavedMessageService(SavedMessageRepository savedMessageRepository) {
        this.savedMessageRepository = savedMessageRepository;
    }

    @Transactional(readOnly = true)
    public List<SavedMessage> getSavedMessageByUser(User user) {
        return savedMessageRepository.findByUser(user);
    }

    @Transactional
    public void save(SavedMessage savedMessage) {
        savedMessageRepository.save(savedMessage);
        log.info(savedMessage.getUser().getName() + " saved the message");
    }

    @Transactional
    public void deleteAllByUser(User user) {
        savedMessageRepository.deleteAllByUser(user);
        log.info(user.getName() + " deleted all saved messages");
    }

    @Transactional
    public void delete(BigInteger id) {
        savedMessageRepository.deleteById(id);
        log.info("Deleted saved message with id: " + id);
    }

    @Transactional(readOnly = true)
    public void checkSavedMessage(User user, Message message) {
        List<SavedMessage> savedMessages = savedMessageRepository.findByUser(user);
        for (SavedMessage savedMessage : savedMessages) {
            if (savedMessage.getMessage().getId().equals(message.getId())) {
                log.info("Message with id " + message.getId() + " already saved");
                throw new MessageException("Данное сообщение уже сохранено");
            }
        }
    }

    @Transactional(readOnly = true)
    public SavedMessage getSavedMessageByMessageAndUser(Message message, User user) {
        SavedMessage savedMessage = savedMessageRepository.findByMessageAndUser(message, user).orElse(null);
        if (savedMessage == null) {
            log.info(user.getName() + " does not have a current saved message with id: " + message.getId());
            throw new MessageException("У пользователя не существует такого сохранённого сообщения");
        }
        return savedMessage;
    }
}
