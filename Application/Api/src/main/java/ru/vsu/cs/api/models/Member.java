package ru.vsu.cs.api.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Entity
@Table(name = "members")
@Data
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;

    @OneToOne
    @JoinColumn(name = "channel_id", referencedColumnName = "id")
    private Channel channel;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToOne
    @JoinColumn(name = "role", referencedColumnName = "id")
    private Role role;

    public Member(Channel channel, User user, Role role) {
        this.channel = channel;
        this.user = user;
        this.role = role;
    }
}
