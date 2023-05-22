package ru.vsu.cs.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;
import ru.vsu.cs.api.dto.UserResponseDto;
import ru.vsu.cs.api.models.*;
import ru.vsu.cs.api.services.ChatService;
import ru.vsu.cs.api.services.MemberService;
import ru.vsu.cs.api.services.SavedMessageService;
import ru.vsu.cs.api.services.UserService;
import ru.vsu.cs.api.utils.ErrorResponse;
import ru.vsu.cs.api.utils.exceptions.UserException;
import ru.vsu.cs.api.utils.mapper.Mapper;

import java.io.IOException;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
@ControllerAdvice
public class UserController {

    private final UserService userService;
    private final SavedMessageService savedMessageService;
    private final MemberService memberService;

    private final ChatService chatService;

    @Autowired
    public UserController(UserService userService, SavedMessageService savedMessageService, MemberService memberService, ChatService chatService) {
        this.userService = userService;
        this.savedMessageService = savedMessageService;
        this.memberService = memberService;
        this.chatService = chatService;
    }

    @GetMapping
    public List<UserResponseDto> getUsers() {
        List<User> users = userService.getUsers();
        List<UserResponseDto> response = new ArrayList<>();

        users.forEach(user -> {
            List<Chat> chats = chatService.getChatsByUser(user);
            List<Message> messages = savedMessageService.getSavedMessageByUser(user)
                    .stream()
                    .map(SavedMessage::getMessage)
                    .toList();
            List<Channel> channels = memberService.getMembersByUser(user).stream().map(Member::getChannel).toList();

            response.add(Mapper.convertToUserResponseDto(user, chats, messages, channels));
        });

        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getProfile(@PathVariable("id") BigInteger id) {
        User user = userService.getById(id);

        return new ResponseEntity<>(Mapper.convertToUserResponseDto(
                user, chatService.getChatsByUser(user),
                savedMessageService.getSavedMessageByUser(user).stream().map(SavedMessage::getMessage).toList(),
                memberService.getMembersByUser(user).stream().map(Member::getChannel).toList()
        ), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}/update/image", consumes = {"multipart/form-data"})
    public ResponseEntity<HttpStatus> updateImage(@PathVariable("id") BigInteger id,
                                                  @RequestParam("file") MultipartFile multipartFile) {
        try {
            userService.updateImage(id, multipartFile.getBytes());
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping(value = "/{id}/update/email")
    public ResponseEntity<HttpStatus> updateEmail(@PathVariable("id") BigInteger id,
                                                  @RequestParam("email") String email) {
        userService.updateEmail(id, email);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping(value = "/{id}/update/name")
    public ResponseEntity<HttpStatus> updateName(@PathVariable("id") BigInteger id,
                                                 @RequestParam("name") String name) {
        userService.updateName(id, name);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping(value = "/{id}/update/password")
    public ResponseEntity<HttpStatus> updatePassword(@PathVariable("id") BigInteger id,
                                                     @RequestParam("last_password") String lastPassword,
                                                     @RequestParam("new_password") String newPassword) {
        userService.updatePassword(id, lastPassword, newPassword);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete_image")
    public ResponseEntity<HttpStatus> deleteImage(@PathVariable("id") BigInteger id) {
        userService.updateImage(id, null);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") BigInteger id) {
        userService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> userException(UserException ex) {
        ErrorResponse response = new ErrorResponse(
                ex.getMessage(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler()
    private ResponseEntity<ErrorResponse> fileMaxSizeException(MaxUploadSizeExceededException ex) {
        ErrorResponse response = new ErrorResponse(
                ex.getMessage(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(response, HttpStatus.PAYLOAD_TOO_LARGE);
    }
}