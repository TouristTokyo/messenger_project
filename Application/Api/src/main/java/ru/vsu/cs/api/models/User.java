package ru.vsu.cs.api.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "image")
    private byte[] image;

    @OneToMany(mappedBy = "userFirst")
    private List<Chat> chats;

    @Transient
    private List<Message> savedMessage;

    @Transient
    private List<Channel> channels;

}
