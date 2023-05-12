package ru.vsu.cs.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.api.models.User;
import ru.vsu.cs.api.repositories.UserRepository;
import ru.vsu.cs.api.utils.exceptions.UserException;

import java.math.BigInteger;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User login(String email, String password) {
        User user = getUserByEmail(email);
        if (user == null) {
            throw new UserException("Not found user with email: " + email);
        }
        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            throw new UserException("Not found user with password: " + password);
        }
    }

    public User getUserByName(String name) {
        return userRepository.findByName(name).orElse(null);
    }

    public User getById(BigInteger id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new UserException("Not found user with id: " + id);
        }
        return user;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void save(User user) {
        if (getUserByEmail(user.getEmail()) != null) {
            throw new UserException("Exist user with email: " + user.getEmail());
        }
        if (getUserByName(user.getName()) != null) {
            throw new UserException("Exist user with nickname: " + user.getName());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void updateImage(BigInteger id, byte[] array) {
        User user = getById(id);
        user.setImage(array);
        userRepository.save(user);
    }


    @Transactional
    public void updateEmail(BigInteger id, String email) {
        User foundUserByEmail = getUserByEmail(email);
        User user = getById(id);

        if (foundUserByEmail != null && !foundUserByEmail.getId().equals(id)) {
            throw new UserException("Exist user with email: " + email);
        }

        user.setEmail(email);

        userRepository.save(user);
    }

    @Transactional
    public void updateName(BigInteger id, String name) {
        User foundUserByName = getUserByName(name);
        User user = getById(id);

        if (foundUserByName != null && !foundUserByName.getId().equals(id)) {
            throw new UserException("Exist user with nickname: " + name);
        }

        user.setName(name);

        userRepository.save(user);
    }

    @Transactional
    public void updatePassword(BigInteger id, String password) {
        User user = getById(id);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Transactional
    public void delete(BigInteger id) {
        userRepository.deleteById(id);
    }
}
