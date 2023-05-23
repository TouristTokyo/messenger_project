package ru.vsu.cs.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.api.dto.SavedMessageDto;
import ru.vsu.cs.api.models.SavedMessage;
import ru.vsu.cs.api.models.User;
import ru.vsu.cs.api.services.MessageService;
import ru.vsu.cs.api.services.SavedMessageService;
import ru.vsu.cs.api.services.UserService;
import ru.vsu.cs.api.utils.ErrorResponse;
import ru.vsu.cs.api.utils.exceptions.UserException;

import java.math.BigInteger;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/saved_message")
@CrossOrigin
@Tag(name = "Сохранённые сообщения", description = "Методы для работы с сообщениями")
public class SaveMessageController {
    private final UserService userService;
    private final SavedMessageService savedMessageService;
    private final MessageService messageService;

    @Autowired
    public SaveMessageController(UserService userService, SavedMessageService savedMessageService,
                                 MessageService messageService) {
        this.userService = userService;
        this.savedMessageService = savedMessageService;
        this.messageService = messageService;
    }

    @PostMapping("/save")
    @Operation(summary = "Сохранить сообщение")
    public ResponseEntity<HttpStatus> saveMessage(@RequestBody SavedMessageDto savedMessageDto) {
        User user = userService.getUserByName(savedMessageDto.getUsername());

        savedMessageService.save(new SavedMessage(messageService.getMessage(savedMessageDto.getMessageId()), user));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Удалить сохранённое собщение")
    public ResponseEntity<HttpStatus> deleteMessage(@PathVariable("id")BigInteger id){
        savedMessageService.delete(id);
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
}
