package ru.vsu.cs.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.api.dto.ChatCreationDto;
import ru.vsu.cs.api.dto.ChatResponseDto;
import ru.vsu.cs.api.models.Chat;
import ru.vsu.cs.api.models.User;
import ru.vsu.cs.api.services.ChatService;
import ru.vsu.cs.api.services.UserService;
import ru.vsu.cs.api.utils.ErrorResponse;
import ru.vsu.cs.api.utils.exceptions.ChatException;
import ru.vsu.cs.api.utils.exceptions.UserException;
import ru.vsu.cs.api.utils.mapper.Mapper;

import java.math.BigInteger;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin
public class ChatController {
    private final UserService userService;
    private final ChatService chatService;

    @Autowired
    public ChatController(UserService userService, ChatService chatService) {
        this.userService = userService;
        this.chatService = chatService;
    }

    @PostMapping("/create")
    public ResponseEntity<ChatResponseDto> createChat(@RequestBody ChatCreationDto chatCreationDto) {
        User currentUser = userService.getUserByName(chatCreationDto.getCurrentUsername());
        User otherUser = userService.getUserByName(chatCreationDto.getOtherUsername());

        if (currentUser == null || otherUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Chat chat = chatService.create(Mapper.convertToChat(currentUser, otherUser));

        return new ResponseEntity<>(Mapper.convertToChatResponseDto(chat), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteChat(@PathVariable("id") BigInteger id) {
        chatService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ChatResponseDto getChatById(@PathVariable("id") BigInteger id) {
        return Mapper.convertToChatResponseDto(chatService.getById(id));
    }

    @GetMapping("/usernames")
    public ResponseEntity<ChatResponseDto> getChatByUsernames(@RequestParam("first_user") String firstUser,
                                                              @RequestParam("second_user") String secondUser) {
        if (firstUser == null || secondUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User currentUser = userService.getUserByName(firstUser);
        User otherUser = userService.getUserByName(secondUser);

        if (currentUser == null || otherUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Chat chat = chatService.getByUsernames(currentUser, otherUser);

        return new ResponseEntity<>(Mapper.convertToChatResponseDto(chat), HttpStatus.OK);
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handleException(UserException ex) {
        ErrorResponse response = new ErrorResponse(
                ex.getMessage(),
                LocalDate.now()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler
    private ResponseEntity<ErrorResponse> chatException(ChatException ex) {
        ErrorResponse response = new ErrorResponse(
                ex.getMessage(),
                LocalDate.now()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
