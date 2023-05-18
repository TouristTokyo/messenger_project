package ru.vsu.cs.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.api.dto.ChatMessageDto;
import ru.vsu.cs.api.models.Chat;
import ru.vsu.cs.api.services.ChatService;
import ru.vsu.cs.api.services.MessageService;
import ru.vsu.cs.api.utils.ErrorResponse;
import ru.vsu.cs.api.utils.exceptions.ChatException;
import ru.vsu.cs.api.utils.mapper.Mapper;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin
public class MessageController {
    private final MessageService messageService;
    private final ChatService chatService;

    @Autowired
    public MessageController(MessageService messageService, ChatService chatService) {
        this.messageService = messageService;
        this.chatService = chatService;
    }

    @GetMapping
    public List<ChatMessageDto> getMessagesForChats(@RequestParam("chat") BigInteger id) {
        Chat chat = chatService.getById(id);
        return messageService.getMessagesByChat(chat).stream().map(Mapper::convertToChatMessageDto).toList();
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
