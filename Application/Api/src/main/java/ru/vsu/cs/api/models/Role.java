package ru.vsu.cs.api.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;

    @OneToOne
    @JoinColumn(name = "member", referencedColumnName = "id")
    private Member member;

    @Column(name = "name")
    private String name;

    @Column(name = "is_admin")
    private Boolean isAdmin;

    @Column(name = "is_creator")
    private Boolean isCreator;
}
