package ru.vsu.cs.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.api.dto.ChannelCreationDto;
import ru.vsu.cs.api.dto.message.ChannelMessageCreationDto;
import ru.vsu.cs.api.dto.message.ChannelMessageDto;
import ru.vsu.cs.api.dto.ChannelResponseDto;
import ru.vsu.cs.api.dto.search.ChannelSearchDto;
import ru.vsu.cs.api.models.*;
import ru.vsu.cs.api.services.*;
import ru.vsu.cs.api.utils.ErrorResponse;
import ru.vsu.cs.api.utils.exceptions.ChannelException;
import ru.vsu.cs.api.utils.exceptions.UserException;
import ru.vsu.cs.api.utils.mapper.Mapper;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/channels")
@CrossOrigin
public class ChannelController {
    private final MemberService memberService;
    private final ChannelService channelService;
    private final UserService userService;
    private final RoleService roleService;
    private final MessageService messageService;

    @Autowired
    public ChannelController(MemberService memberService, ChannelService channelService, UserService userService,
                             RoleService roleService, MessageService messageService) {
        this.memberService = memberService;
        this.channelService = channelService;
        this.userService = userService;
        this.roleService = roleService;
        this.messageService = messageService;
    }

    @GetMapping
    public List<ChannelSearchDto> getChannels() {
        return channelService.getAll().stream().map(Mapper::convertToChannelDto).toList();
    }

    @PostMapping("/create")
    public ResponseEntity<ChannelResponseDto> create(@RequestBody ChannelCreationDto channelCreationDto) {
        User user = userService.getUserByName(channelCreationDto.getUsername());
        Channel channel = channelService.create(new Channel(user, channelCreationDto.getChannelName()));

        Role role = roleService.save(new Role("Owner", true, true));

        Member member = new Member(channel, user, role);
        memberService.save(member);

        List<Member> members = memberService.getMembersByChannel(channel);
        List<Message> messages = messageService.getMessagesByChannel(channel);

        return new ResponseEntity<>(Mapper.convertToChannelResponseDto(channel, members, messages), HttpStatus.OK);
    }

    @PostMapping("/add_message")
    public ResponseEntity<ChannelMessageDto> addMessage(
            @RequestBody ChannelMessageCreationDto channelMessageCreationDto) {
        Channel channel = channelService.getChannelByName(channelMessageCreationDto.getChannelName());
        User user = userService.getUserByName(channelMessageCreationDto.getCurrentUsername());

        Message message = messageService.save(new Message(user, channel, channelMessageCreationDto.getMessage()));

        return new ResponseEntity<>(Mapper.convertToChannelMessageDto(message), HttpStatus.OK);
    }

    @PostMapping("/join")
    public ResponseEntity<HttpStatus> joinToChannel(@RequestParam("username") String username,
                                                    @RequestParam("channel_name") String channelName) {

        User user = userService.getUserByName(username);
        Channel channel = channelService.getChannelByName(channelName);

        Role role = roleService.save(new Role("member", false, false));

        Member member = new Member(channel, user, role);
        memberService.save(member);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}/leave")
    public ResponseEntity<HttpStatus> leave(@PathVariable("id") BigInteger id,
                                            @RequestParam("username") String username) {
        Member member = memberService.getMemberByUserAndChannel(userService.getUserByName(username),
                channelService.getChannelById(id));

        roleService.delete(member.getRole().getId());
        memberService.delete(member.getId());

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<HttpStatus> updateName(@PathVariable("id") BigInteger id,
                                                 @RequestParam("name") String name) {
        channelService.updateName(id, name);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ChannelResponseDto getChannel(@PathVariable("id") BigInteger id) {
        Channel channel = channelService.getChannelById(id);
        List<Member> members = memberService.getMembersByChannel(channel);
        List<Message> messages = messageService.getMessagesByChannel(channel);

        return Mapper.convertToChannelResponseDto(channel, members, messages);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") BigInteger id) {
        List<Member> members = memberService.getMembersByChannel(channelService.getChannelById(id));
        members.forEach(member -> roleService.delete(member.getRole().getId()));

        channelService.delete(id);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> channelException(ChannelException ex) {
        ErrorResponse response = new ErrorResponse(
                ex.getMessage(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
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
