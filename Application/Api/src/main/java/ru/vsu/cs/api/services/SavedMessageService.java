package ru.vsu.cs.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.api.models.SavedMessage;
import ru.vsu.cs.api.models.User;
import ru.vsu.cs.api.repositories.SavedMessageRepository;

import java.math.BigInteger;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class SavedMessageService {
    private final SavedMessageRepository savedMessageRepository;

    @Autowired
    public SavedMessageService(SavedMessageRepository savedMessageRepository) {
        this.savedMessageRepository = savedMessageRepository;
    }

    public List<SavedMessage> getSavedMessageByUser(User user) {
        return savedMessageRepository.findByUser(user);
    }

    @Transactional
    public void save(SavedMessage savedMessage) {
        savedMessageRepository.save(savedMessage);
    }

    @Transactional
    public void delete(BigInteger id) {
        savedMessageRepository.deleteById(id);
    }
}
