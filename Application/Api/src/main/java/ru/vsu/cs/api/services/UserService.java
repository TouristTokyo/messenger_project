package ru.vsu.cs.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.api.models.User;
import ru.vsu.cs.api.repositories.UserRepository;
import ru.vsu.cs.api.utils.exceptions.UserException;

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
}
