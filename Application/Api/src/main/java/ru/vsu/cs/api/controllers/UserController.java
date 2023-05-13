package ru.vsu.cs.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;
import ru.vsu.cs.api.dto.UserResponseDto;
import ru.vsu.cs.api.services.UserService;
import ru.vsu.cs.api.utils.ErrorResponse;
import ru.vsu.cs.api.utils.exceptions.UserException;
import ru.vsu.cs.api.utils.mapper.Mapper;

import java.io.IOException;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
@ControllerAdvice
public class UserController {

    public final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponseDto> getUsers() {
        return userService.getUsers().stream().map(Mapper::convertToUserResponseDto).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getProfile(@PathVariable("id") BigInteger id) {
        return new ResponseEntity<>(Mapper.convertToUserResponseDto(userService.getById(id)), HttpStatus.OK);
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
    public ResponseEntity<HttpStatus> updateImage(@PathVariable("id") BigInteger id,
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
                                                     @RequestParam("password") String password) {
        userService.updatePassword(id, password);
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
    private ResponseEntity<ErrorResponse> handleException(UserException ex) {
        ErrorResponse response = new ErrorResponse(
                ex.getMessage(),
                LocalDate.now()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler()
    private ResponseEntity<ErrorResponse> fileMaxSizeException(MaxUploadSizeExceededException ex) {
        ErrorResponse response = new ErrorResponse(
                ex.getMessage(),
                LocalDate.now()
        );
        return new ResponseEntity<>(response, HttpStatus.PAYLOAD_TOO_LARGE);
    }
}
