package ru.vsu.cs.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.vsu.cs.api.models.Message;
import ru.vsu.cs.api.models.SavedMessage;
import ru.vsu.cs.api.models.User;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Repository
public interface SavedMessageRepository extends JpaRepository<SavedMessage, BigInteger> {
    List<SavedMessage> findByUser(User user);

    void deleteAllByUser(User user);
    Optional<SavedMessage> findByMessageAndUser(Message message, User user);
}
