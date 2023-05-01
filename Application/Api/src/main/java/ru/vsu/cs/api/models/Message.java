package ru.vsu.cs.api.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

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
}
