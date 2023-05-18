package ru.vsu.cs.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;

    @ManyToOne
    @JoinColumn(name = "sender", referencedColumnName = "id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "chat", referencedColumnName = "id")
    private Chat chat;

    @ManyToOne
    @JoinColumn(name = "channel", referencedColumnName = "id")
    private Channel channel;

    @Column(name = "data")
    private String data;

    @Column(name = "date")
    private LocalDateTime date;

    public Message(User sender, Chat chat, String data) {
        this.sender = sender;
        this.chat = chat;
        this.data = data;
        this.date = LocalDateTime.now();
    }
}
