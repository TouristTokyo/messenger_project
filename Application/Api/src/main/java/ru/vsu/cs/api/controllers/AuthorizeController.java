package ru.vsu.cs.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.api.dto.UserCreationDto;
import ru.vsu.cs.api.dto.UserLoginDto;
import ru.vsu.cs.api.dto.UserResponseDto;
import ru.vsu.cs.api.models.*;
import ru.vsu.cs.api.services.MemberService;
import ru.vsu.cs.api.services.SavedMessageService;
import ru.vsu.cs.api.services.UserService;
import ru.vsu.cs.api.utils.ErrorResponse;
import ru.vsu.cs.api.utils.exceptions.UserException;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AuthorizeController {
    private final UserService userService;
    private final SavedMessageService savedMessageService;
    private final MemberService memberService;

    public AuthorizeController(UserService userService, SavedMessageService savedMessageService, MemberService memberService) {
        this.userService = userService;
        this.savedMessageService = savedMessageService;
        this.memberService = memberService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody UserLoginDto userLoginDto) {
        User user = userService.login(userLoginDto.getEmail(), userLoginDto.getPassword());

        List<Message> savedMessages = savedMessageService.getSavedMessageByUser(user).stream()
                .map(SavedMessage::getMessage)
                .toList();

        List<Channel> channels = memberService.getMembersByUser(user).stream()
                .map(Member::getChannel)
                .toList();

        user.setSavedMessage(savedMessages);
        user.setChannels(channels);

        return new ResponseEntity<>(convertToUserResponseDto(user), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> register(@RequestBody UserCreationDto userCreationDto) {
        userService.save(convertToUser(userCreationDto));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    private UserResponseDto convertToUserResponseDto(User user) {
        UserResponseDto userResponseDto = new UserResponseDto();

        userResponseDto.setId(user.getId());
        userResponseDto.setName(user.getName());
        userResponseDto.setEmail(user.getEmail());
        userResponseDto.setPassword(user.getPassword());
        userResponseDto.setImage(user.getImage());
        userResponseDto.setChats(user.getChats());
        userResponseDto.setSavedMessages(user.getSavedMessage());
        userResponseDto.setChannels(user.getChannels());

        return userResponseDto;
    }

    private User convertToUser(UserCreationDto userCreationDto) {
        User user = new User();

        user.setName(userCreationDto.getName());
        user.setEmail(userCreationDto.getEmail());
        user.setPassword(userCreationDto.getPassword());

        return user;
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handleException(UserException ex) {
        ErrorResponse response = new ErrorResponse(
                ex.getMessage(),
                LocalDate.now()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

}
